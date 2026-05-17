// ============================================================
// AWS Cognito Configuration
// Fill these values from your AWS Cognito Console
// ============================================================

const awsConfig = {
  // AWS Region
  region: 'eu-north-1',

  // Cognito User Pool
  userPoolId: 'eu-north-1_XXXXXXXXX',       // ← Replace with your User Pool ID
  userPoolClientId: 'XXXXXXXXXXXXXXXXXXXXXXXXXX', // ← Replace with your App Client ID

  // API Gateway
  apiBaseUrl: 'https://k1mc2lx25c.execute-api.eu-north-1.amazonaws.com',

  // Cognito Groups (must match groups created in Cognito console)
  groups: {
    ADMIN: 'Admin',
    TEACHER: 'Teacher',
    SCHEDULER: 'Scheduler',
    STUDENT: 'Student',
  },
};

export default awsConfig;
