import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Request from '../lib/request';
import { useAppStore } from '../store/useAppStore';
import { APP_NAME } from '../data';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAppStore((state) => state.setAuth);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await Request.Post('/auth/login', { email, password });

      if (response.error) {
        Alert.alert('Error', response.error);
      } else {
        await setAuth(response.token, response.user);
        router.replace('/');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <View className="items-center mb-8">
          <Image
            source={require('../assets/mine.png')}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
          <Text className="text-2xl font-bold text-gray-900 mt-3">{APP_NAME}</Text>
          <Text className="text-sm text-gray-500 mt-1">Welcome back</Text>
        </View>

        <View className="w-full">
          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 mb-2">Email Address</Text>
            <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3">
              <Ionicons name="mail-outline" size={20} color="#6b7280" />
              <TextInput
                className="flex-1 h-12 px-2 text-base text-gray-900"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View className="mb-5">
            <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
            <View className="flex-row items-center bg-white border border-gray-300 rounded-lg px-3">
              <Ionicons name="lock-closed-outline" size={20} color="#6b7280" />
              <TextInput
                className="flex-1 h-12 px-2 text-base text-gray-900"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className={`flex-row items-center justify-center h-12 rounded-lg mt-2 mb-6 ${loading ? 'bg-gray-300' : 'bg-blue-600'}`}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="log-in-outline" size={20} color="white" />
                <Text className="text-white text-base font-semibold ml-2">Login</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text className="text-center text-sm">
              <Text className="text-gray-500">Don't have an account? </Text>
              <Text className="text-blue-600 font-semibold">Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
