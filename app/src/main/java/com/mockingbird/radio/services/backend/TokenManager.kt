package com.mockingbird.radio.services.backend

import android.content.Context
import android.content.SharedPreferences
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey

class TokenManager(context: Context) {
    private val sharedPreferences: SharedPreferences
    
    companion object {
        private const val PREFS_FILE_NAME = "radio_auth_prefs"
        private const val ACCESS_TOKEN_KEY = "access_token"
        private const val REFRESH_TOKEN_KEY = "refresh_token"
    }
    
    init {
        val masterKey = MasterKey.Builder(context)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build()
            
        sharedPreferences = EncryptedSharedPreferences.create(
            context,
            PREFS_FILE_NAME,
            masterKey,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )
    }
    
    fun getAccessToken(): String? {
        return sharedPreferences.getString(ACCESS_TOKEN_KEY, null)
    }
    
    fun getRefreshToken(): String? {
        return sharedPreferences.getString(REFRESH_TOKEN_KEY, null)
    }
    
    fun saveTokens(accessToken: String?, refreshToken: String?) {
        sharedPreferences.edit().apply {
            if (accessToken != null) {
                putString(ACCESS_TOKEN_KEY, accessToken)
            }
            if (refreshToken != null) {
                putString(REFRESH_TOKEN_KEY, refreshToken)
            }
            apply()
        }
    }
    
    fun clearTokens() {
        sharedPreferences.edit().apply {
            remove(ACCESS_TOKEN_KEY)
            remove(REFRESH_TOKEN_KEY)
            apply()
        }
    }
    
    fun hasValidTokens(): Boolean {
        return !getAccessToken().isNullOrEmpty()
    }
}