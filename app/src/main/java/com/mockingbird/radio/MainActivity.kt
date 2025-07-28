package com.mockingbird.radio

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import com.mockingbird.radio.ui.screens.HomeScreen
import com.mockingbird.radio.ui.screens.SettingsScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                MainScreen()
            }
        }
    }
}

@Composable
fun MainScreen() {
    var selectedItem by remember { mutableIntStateOf(0) }
    var playing by remember { mutableStateOf(false) }
    
    val items = listOf(
        BottomNavItem("Home", Icons.Filled.Home, 0),
        // add more later like:
        BottomNavItem("Settings", Icons.Filled.Settings, 1),
        // BottomNavItem("Library", Icons.Filled.LibraryMusic, 2)
    )
    
    Scaffold(
        bottomBar = {
            NavigationBar(
                containerColor = Color(0xFF1C1C1E),
                contentColor = Color(0xFFDDB880)
            ) {
                items.forEachIndexed { index, item ->
                    NavigationBarItem(
                        icon = { 
                            Icon(
                                item.icon, 
                                contentDescription = item.label,
                                tint = if (selectedItem == index) Color(0xFFDDB880) else Color(0xFF666666)
                            ) 
                        },
                        label = { 
                            Text(
                                item.label,
                                color = if (selectedItem == index) Color(0xFFDDB880) else Color(0xFF666666)
                            ) 
                        },
                        selected = selectedItem == index,
                        onClick = { selectedItem = index },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Color(0xFFDDB880),
                            selectedTextColor = Color(0xFFDDB880),
                            unselectedIconColor = Color(0xFF666666),
                            unselectedTextColor = Color(0xFF666666),
                            indicatorColor = Color(0xFF2C2C2E)
                        )
                    )
                }
            }
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            when (selectedItem) {
                0 -> HomeScreen()
                1 -> SettingsScreen()
            }
        }
    }
}

data class BottomNavItem(
    val label: String,
    val icon: ImageVector,
    val index: Int
)