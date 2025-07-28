package com.mockingbird.radio.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.mockingbird.radio.ui.components.PlayButton
import com.mockingbird.radio.ui.components.RadioDial
import com.mockingbird.radio.ui.viewmodels.HomeScreenViewModel
import androidx.lifecycle.viewmodel.compose.viewModel

@Composable
fun HomeScreen(
    viewModel: HomeScreenViewModel = viewModel()
) {
    val isPlaying by viewModel.isPlaying.collectAsState()
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF1C1C1E))
            .padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Mechanical Radio",
            style = TextStyle(
                fontSize = 28.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color(0xFFDDB880)
            ),
            modifier = Modifier.padding(bottom = 20.dp)
        )
        
        RadioDial(playing = isPlaying)
        Spacer(modifier = Modifier.height(20.dp))
        PlayButton(
            playing = isPlaying,
            onPress = viewModel::togglePlayPause
        )
    }
}
