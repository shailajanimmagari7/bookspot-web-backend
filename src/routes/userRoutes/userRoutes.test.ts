import request from 'supertest';
import express from 'express';
import  sequelize  from '../../models/userModel';
import UserRouter from './userRoutes';
import  User  from '../../models/userModel';

const app = express();
app.use(express.json());
app.use('/api/user', UserRouter);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterEach(async () => {
  await User.destroy({ where: {} });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User API Routes Tests', () => {

  it('should return status Working for /check route', async () => {
    const res = await request(app).get('/api/user/check');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('Working');
  });

  it('should successfully create a new user on /register route', async () => {
    const newUser = {
      username: 'Shailaja',
      password: 'password123',
      emailAddress: 'shailaja@gmail.com',
    };

    const res = await request(app)
      .post('/api/user/register')
      .send(newUser);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User created successfully! Now you can log in.');
    expect(res.body.user).toHaveProperty('username', newUser.username);
    expect(res.body.user).toHaveProperty('emailAddress', newUser.emailAddress);
  });

  it('should return an error if any required field is missing in /register route', async () => {
    const newUser = {
      username: 'Shailaja',
      password: 'password123',
    };

    const res = await request(app)
      .post('/api/user/register')
      .send(newUser);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('All fields (username, password, email) are required');
  });

  it('should return an error if username already exists in /register route', async () => {
    const existingUser = {
      username: 'Shailaja',
      password: 'password123',
      emailAddress: 'shailaja@gmail.com',
    };

    await request(app).post('/api/user/register').send(existingUser);

    const newUser = {
      username: 'Shailaja',
      password: 'newpassword',
      emailAddress: 'newemail@example.com',
    };

    const res = await request(app)
      .post('/api/user/register')
      .send(newUser);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Username already exists');
  });

  it('should log in an existing user with correct credentials on /login route', async () => {
    const user = {
      username: 'Shailaja',
      password: 'password123',
      emailAddress: 'shailaja@gmail.com',
    };

    await request(app).post('/api/user/register').send(user);

    const loginData = {
      username: 'Shailaja',
      password: 'password123',
    };

    const res = await request(app)
      .post('/api/user/login')
      .send(loginData);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Successfully logged in!');
    expect(res.body.user.username).toBe('Shailaja');
  });

  it('should return error for incorrect password on /login route', async () => {
    const user = {
      username: 'Shailaja',
      password: 'password123',
      emailAddress: 'shailaja@gmail.com',
    };

    await request(app).post('/api/user/register').send(user);

    const loginData = {
      username: 'Shailaja',
      password: 'wrongPassword',
    };

    const res = await request(app)
      .post('/api/user/login')
      .send(loginData);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('The password is incorrect');
  });

  it('should return error if no user found during login on /login route', async () => {
    const loginData = {
      username: 'nonexistentUser',
      password: 'password123',
    };

    const res = await request(app)
      .post('/api/user/login')
      .send(loginData);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('No user found');
  });
});
