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


@Composable
fun SettingsScreen(
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF1C1C1E))
            .padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Settings",
            style = TextStyle(
                fontSize = 28.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color(0xFFDDB880)
            ),
            modifier = Modifier.padding(bottom = 20.dp)
        )
        Text(
            text = "Settings",
            style = TextStyle(
                fontSize = 28.sp,
                fontWeight = FontWeight.Normal,
                color = Color(0xFFDDB880)
            ),
            modifier = Modifier.padding(bottom = 20.dp)
        )
        TextField(
            value = "",
            onValueChange = {},
            label = { Text("Search Settings") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 20.dp),
            // colors = TextFieldDefaults.textFieldColors(
            //     focusedIndicatorColor = Color(0xFFDDB880),
            //     unfocusedIndicatorColor = Color(0xFF666666),
            //     textColor = Color(0xFFDDB880)
            // )
        )
        
        
    }
}
