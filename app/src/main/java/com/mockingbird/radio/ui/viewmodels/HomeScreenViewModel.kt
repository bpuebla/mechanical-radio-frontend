package com.mockingbird.radio.ui.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import android.media.MediaPlayer
import android.util.Log
import java.io.IOException

class HomeScreenViewModel : ViewModel() {
    private val _isPlaying = MutableStateFlow(false)
    val isPlaying: StateFlow<Boolean> = _isPlaying.asStateFlow()
    
    private var mediaPlayer: MediaPlayer? = null
    private val radioUrl = "YOUR_MP3_URL_HERE" // replace w/ actual url
    
    fun togglePlayPause() {
        viewModelScope.launch {
            if (_isPlaying.value) {
                pauseRadio()
            } else {
                playRadio()  
            }
        }
    }
    
    private fun playRadio() {
        try {
            if (mediaPlayer == null) {
                mediaPlayer = MediaPlayer().apply {
                    setDataSource(radioUrl)
                    prepareAsync()
                    setOnPreparedListener {
                        start()
                        _isPlaying.value = true
                    }
                    setOnErrorListener { _, what, extra ->
                        Log.e("HomeScreenViewModel", "mediaplayer error: $what, $extra")
                        _isPlaying.value = false
                        true
                    }
                }
            } else {
                mediaPlayer?.start()
                _isPlaying.value = true
            }
        } catch (e: IOException) {
            Log.e("HomeScreenViewModel", "failed to play radio", e)
            _isPlaying.value = false
        }
    }
    
    private fun pauseRadio() {
        mediaPlayer?.pause()
        _isPlaying.value = false
    }
    
    override fun onCleared() {
        super.onCleared()
        mediaPlayer?.release()
        mediaPlayer = null
    }
}