// Authentication test utility
// This file demonstrates how the mocked authentication system works

export interface MockUser {
  id: number;
  email: string;
  username: string;
  password: string;
}

// Mock user database (in memory)
export const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    email: 'demo@example.com',
    username: 'demo_user',
    password: 'password123'
  },
  {
    id: 2,
    email: 'test@example.com',
    username: 'test_user',
    password: 'password123'
  }
];

// Test authentication functions
export const testLogin = (email: string, password: string): boolean => {
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  return !!user;
};

export const testRegister = (email: string, username: string, password: string): boolean => {
  const existingUser = MOCK_USERS.find(u => u.email === email || u.username === username);
  if (existingUser) {
    return false;
  }
  
  const newUser: MockUser = {
    id: MOCK_USERS.length + 1,
    email,
    username,
    password
  };
  
  MOCK_USERS.push(newUser);
  return true;
};

// Test scenarios
export const runAuthTests = () => {
  console.log('🧪 Running Authentication Tests...');
  
  // Test 1: Valid login
  const test1 = testLogin('demo@example.com', 'password123');
  console.log('✅ Test 1 - Valid login:', test1);
  
  // Test 2: Invalid login
  const test2 = testLogin('demo@example.com', 'wrongpassword');
  console.log('✅ Test 2 - Invalid login:', !test2);
  
  // Test 3: Register new user
  const test3 = testRegister('new@example.com', 'new_user', 'password123');
  console.log('✅ Test 3 - Register new user:', test3);
  
  // Test 4: Register duplicate email
  const test4 = testRegister('demo@example.com', 'another_user', 'password123');
  console.log('✅ Test 4 - Register duplicate email:', !test4);
  
  console.log('🎉 Authentication tests completed!');
  console.log('Current users:', MOCK_USERS.map(u => ({ email: u.email, username: u.username })));
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).runAuthTests = runAuthTests;
  (window as any).testLogin = testLogin;
  (window as any).testRegister = testRegister;
} 