import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "../screens/HomeScreen"
import BookmarkScreen from "../screens/BookmarkScreen"
import NewItemScreen from "../screens/NewItemScreen"
import SettingsScreen from "../screens/SettingsScreen"
import ScanScreen from "../screens/ScanScreen"


const Tab = createBottomTabNavigator()

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
        >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#e32f45'
        }}>
            {children}
        </View>
    </TouchableOpacity>
)

const Tabs = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elavation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                }
            }}
        >

            <Tab.Screen 
                name = "Home" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                            source={require('../../assets/icons/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                            />
                            <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                            HOME
                            </Text>
                        </View>
                    )
            }} />
            <Tab.Screen 
                name = "New Item" 
                component={NewItemScreen} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                            source={require('../../assets/icons/folder.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                            />
                            <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                            NEW ITEM
                            </Text>
                        </View>
                    )
            }}/>
            <Tab.Screen 
                name = "Scan" 
                component={ScanScreen} 
                options={{
                  tabBarIcon: ({focused}) => (
                   <Image
                        source={require('../../assets/icons/camera.png')}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: '#fff'
                        }}
                    />
                  ),
                  tabBarButton: (props) => (
                    <CustomTabBarButton {...props} />
                  )
            }}
            />
            <Tab.Screen 
                name = "Bookmarks" 
                component={BookmarkScreen} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                            source={require('../../assets/icons/book-bookmark.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                            />
                            <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                            BOOKMARK
                            </Text>
                        </View>
                    )
            }}/>
            <Tab.Screen 
                name = "Settings" 
                component={SettingsScreen} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Image
                            source={require('../../assets/icons/settings.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                            />
                            <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                            SETTINGS
                            </Text>
                        </View>
                    )
            }}/>
        </Tab.Navigator>
    )
} 

export default Tabs

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})