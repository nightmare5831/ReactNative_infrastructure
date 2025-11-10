import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import TestAPI from '../components/TestAPI';
import { APP_NAME } from '../data';
import { useAppStore } from '../store/useAppStore';

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAppStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-500">
      <ScrollView className="flex-1 bg-white">
        <View className="py-5 px-5 bg-blue-500">
          <Text className="text-2xl font-bold text-white text-center">{APP_NAME}</Text>
          {user && <Text className="text-base text-white text-center mt-2">Welcome, {user.name}!</Text>}
        </View>
        <TestAPI />
        <TouchableOpacity className="m-5 p-4 bg-red-500 rounded-lg items-center" onPress={handleLogout}>
          <Text className="text-white text-base font-bold">Logout</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}
