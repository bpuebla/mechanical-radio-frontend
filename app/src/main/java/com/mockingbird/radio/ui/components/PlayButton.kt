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
fun PlayButton(
    playing: Boolean,
    onPress: () -> Unit
) {
    Button(
        onClick = onPress,
        modifier = Modifier
            .shadow(
                elevation = 4.dp,
                shape = RoundedCornerShape(25.dp),
                ambientColor = Color.Black.copy(alpha = 0.2f),
                spotColor = Color.Black.copy(alpha = 0.2f)
            ),
        colors = ButtonDefaults.buttonColors(
            containerColor = Color(0xFFDDB880)
        ),
        shape = RoundedCornerShape(25.dp),
        contentPadding = PaddingValues(
            horizontal = 32.dp,
            vertical = 12.dp
        )
    ) {
        Text(
            text = if (playing) "Pause" else "Play",
            style = TextStyle(
                fontSize = 20.sp,
                color = Color(0xFF423D35)
            )
        )
    }
}