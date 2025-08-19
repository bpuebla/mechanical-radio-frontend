package com.mockingbird.radio.services.backend

import android.content.Context
import android.util.Log
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import java.io.IOException

// data classes for responses
@Serializable
data class LoginRequest(val email: String, val password: String)

@Serializable  
data class RefreshRequest(val refresh: String)

@Serializable
data class GoogleLoginRequest(val token: String)

@Serializable
data class AuthResponse(
    val accessToken: String? = null,
    val refreshToken: String? = null
)

@Serializable
data class TrackResponse(
    val url: String,
    val title: String? = null,
    val artist: String? = null
)

class ApiService(context: Context) {
    private val baseUrl = "http://192.168.1.132:80"
    private val client = OkHttpClient()
    private val json = Json { ignoreUnknownKeys = true }
    private val tokenManager = TokenManager(context)
    
    companion object {
        private const val TAG = "ApiService"
    }
    
    private fun getAuthToken(): String? {
        return tokenManager.getAccessToken()
    }
    
    fun isAuthenticated(): Boolean {
        return tokenManager.hasValidTokens()
    }
    
    fun clearAuthentication() {
        tokenManager.clearTokens()
    }
    
    private suspend fun makeRequest(
        path: String,
        method: String = "GET",
        body: String? = null,
        isRetry: Boolean = false
    ): String = withContext(Dispatchers.IO) {
        Log.d(TAG, "Making request to: $baseUrl$path")
        val token = getAuthToken()
        
        val requestBuilder = Request.Builder()
            .url("$baseUrl$path")
            .addHeader("Content-Type", "application/json")
        
        token?.let {
            requestBuilder.addHeader("Authorization", "Bearer $it")
        }
        
        when (method) {
            "POST" -> requestBuilder.post(
                body?.toRequestBody("application/json".toMediaType())
                    ?: "".toRequestBody()
            )
            "GET" -> requestBuilder.get()
            else -> throw IllegalArgumentException("unsupported method: $method")
        }
        
        val response: Response = client.newCall(requestBuilder.build()).execute()
        
        // Handle 401 Unauthorized - token might be expired
        if (response.code == 401 && !isRetry && tokenManager.getRefreshToken() != null) {
            response.close()
            
            try {
                // Try to refresh the token
                val refreshToken = tokenManager.getRefreshToken()!!
                refresh(refreshToken)
                
                // Retry the original request with the new token
                return@withContext makeRequest(path, method, body, isRetry = true)
            } catch (e: Exception) {
                // Refresh failed, clear tokens and throw original error
                tokenManager.clearTokens()
                throw IOException("authentication failed: ${response.code}")
            }
        }
        
        if (!response.isSuccessful) {
            throw IOException("http error ${response.code}")
        }
        
        response.body?.string() ?: ""
    }
    
    // auth endpoints
    suspend fun login(email: String, password: String): AuthResponse {
        val body = json.encodeToString(LoginRequest.serializer(), LoginRequest(email, password))
        val response = makeRequest("/auth/login", "POST", body)
        val authResponse = json.decodeFromString(AuthResponse.serializer(), response)
        
        // Save tokens after successful login
        tokenManager.saveTokens(authResponse.accessToken, authResponse.refreshToken)
        
        return authResponse
    }
    
    suspend fun register(email: String, password: String): AuthResponse {
        val body = json.encodeToString(LoginRequest.serializer(), LoginRequest(email, password))
        val response = makeRequest("/auth/register", "POST", body)
        val authResponse = json.decodeFromString(AuthResponse.serializer(), response)
        
        // Save tokens after successful registration
        tokenManager.saveTokens(authResponse.accessToken, authResponse.refreshToken)
        
        return authResponse
    }
    
    suspend fun refresh(refreshToken: String): AuthResponse {
        val body = json.encodeToString(RefreshRequest.serializer(), RefreshRequest(refreshToken))
        val response = makeRequest("/auth/refresh", "POST", body)
        val authResponse = json.decodeFromString(AuthResponse.serializer(), response)
        
        // Save new tokens after successful refresh
        tokenManager.saveTokens(authResponse.accessToken, authResponse.refreshToken)
        
        return authResponse
    }
    
    suspend fun googleLogin(googleToken: String): AuthResponse {
        val body = json.encodeToString(GoogleLoginRequest.serializer(), GoogleLoginRequest(googleToken))
        val response = makeRequest("/auth/google/mobile/callback", "POST", body)
        val authResponse = json.decodeFromString(AuthResponse.serializer(), response)
        
        // Save tokens after successful Google login
        tokenManager.saveTokens(authResponse.accessToken, authResponse.refreshToken)
        
        return authResponse
    }
    
    suspend fun logout() {
        makeRequest("/auth/logout", "POST")
        // Clear stored tokens after logout
        tokenManager.clearTokens()
    }
    
    // radio endpoints
    suspend fun getNextTrack(): TrackResponse {
        val response = makeRequest("/next_track")
        return json.decodeFromString(TrackResponse.serializer(), response)
    }
}