package com.mockingbird.radio.network

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

class ApiService {
    private val baseUrl = "http://192.168.1.132:80"
    private val client = OkHttpClient()
    private val json = Json { ignoreUnknownKeys = true }
    
    private fun getAuthToken(): String? {
        // TODO: auth store/preferences
        return null
    }
    
    private suspend fun makeRequest(
        path: String,
        method: String = "GET",
        body: String? = null
    ): String = withContext(Dispatchers.IO) {
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
        
        if (!response.isSuccessful) {
            throw IOException("http error ${response.code}")
        }
        
        response.body?.string() ?: ""
    }
    
    // auth endpoints
    suspend fun login(email: String, password: String): AuthResponse {
        val body = json.encodeToString(LoginRequest.serializer(), LoginRequest(email, password))
        val response = makeRequest("/auth/login", "POST", body)
        return json.decodeFromString(AuthResponse.serializer(), response)
    }
    
    suspend fun register(email: String, password: String): AuthResponse {
        val body = json.encodeToString(LoginRequest.serializer(), LoginRequest(email, password))
        val response = makeRequest("/auth/register", "POST", body)
        return json.decodeFromString(AuthResponse.serializer(), response)
    }
    
    suspend fun refresh(refreshToken: String): AuthResponse {
        val body = json.encodeToString(RefreshRequest.serializer(), RefreshRequest(refreshToken))
        val response = makeRequest("/auth/refresh", "POST", body)
        return json.decodeFromString(AuthResponse.serializer(), response)
    }
    
    suspend fun googleLogin(googleToken: String): AuthResponse {
        val body = json.encodeToString(GoogleLoginRequest.serializer(), GoogleLoginRequest(googleToken))
        val response = makeRequest("/auth/google/mobile/callback", "POST", body)
        return json.decodeFromString(AuthResponse.serializer(), response)
    }
    
    suspend fun logout() {
        makeRequest("/auth/logout", "POST")
    }
    
    // radio endpoints
    suspend fun getNextTrack(): TrackResponse {
        val response = makeRequest("/next_track")
        return json.decodeFromString(TrackResponse.serializer(), response)
    }
}