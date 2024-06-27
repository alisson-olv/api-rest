import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { IPerson } from '../../src/server/database/models';

describe('Persons - Create', () => {
  let cityId: undefined | number = undefined;
  beforeAll(async () => {
    const res = await testServer.post('/cities').send({
      name: 'Any City',
    });

    cityId = res.body;
  });

  it('Should create a new Person in database', async () => {
    const res = await testServer.post('/persons').send({
      cityId,
      email: 'binho_alisson@hotmail.com',
      fullName: 'Alisson Souza',
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual('number');
  });

  it('Should create a new Person in database with different email', async () => {
    const res = await testServer.post('/persons').send({
      cityId,
      email: 'binho@hotmail.com',
      fullName: 'Alisson Souza',
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual('number');
  });

  it('Should not create a Person with a duplicated email', async () => {
    const res = await testServer.post('/persons').send({
      cityId,
      email: 'binho@hotmail.com',
      fullName: 'Alisson Souza',
    });

    expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });

  it('Should not allow creating a Person without email and cityId', async () => {
    const res = await testServer.post('/persons').send({
      fullName: 'Alisson',
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body');
  });

  it('Should not allow creating a fullname Person with less than 3 characters', async () => {
    const res = await testServer.post('/persons').send({
      cityId,
      fullName: 'Ab',
      email: 'binho_alisson@hotmail.com',
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.fullName');
  });

  it('Should not allow creating a Person without email', async () => {
    const res = await testServer.post('/persons').send({
      cityId,
      fullName: 'Alisson Souza',
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
  });

  it('Should not allow creating a Person without cityId', async () => {
    const res = await testServer.post('/persons').send({
      fullName: 'Alisson Souza',
      email: 'chiquin@hotmail.com',
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.cityId');
  });

  it('Should not allow creating a Person with a invalid email', async () => {
    // Teste usando TS (para criar uma Person com as propriedades corretas)
    const person: Partial<IPerson> = {
      cityId,
      email: 'chicobento.com',
      fullName: 'Chico Bento',
    };

    const res = await testServer.post('/persons').send(person);

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.email');
  });
});
