package com.mockingbird.radio.ui.components

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


@Composable
fun RadioDial(playing: Boolean) {
    Box(
        modifier = Modifier
            .size(250.dp)
            .clip(CircleShape)
            .background(Color(0xFFF5F5F5))
            .border(5.dp, Color(0xFFDDB880), CircleShape)
            .shadow(
                elevation = 4.dp,
                shape = CircleShape,
                ambientColor = Color.Black.copy(alpha = 0.2f),
                spotColor = Color.Black.copy(alpha = 0.2f)
            )
            .padding(bottom = 20.dp),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = if (playing) "Playing..." else "Paused",
            style = TextStyle(
                fontSize = 22.sp,
                fontWeight = FontWeight.Medium,
                color = Color(0xFF423D35)
            )
        )
    }
}