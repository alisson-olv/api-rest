import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Persons - GetById', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const res = await testServer.post('/cities').send({
      name: 'Any City',
    });

    cityId = res.body;
  });

  it('Should find a Person by its id', async () => {
    const res = await testServer.post('/persons').send({
      cityId,
      email: 'binho_alisson@hotmail.com',
      fullName: 'Alisson Souza',
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resSearched = await testServer.get(`/persons/${res.body}`).send();

    expect(resSearched.status).toEqual(StatusCodes.OK);
    expect(resSearched.body).toHaveProperty('email');
    expect(resSearched.body).toHaveProperty('cityId');
    expect(resSearched.body).toHaveProperty('fullName');
  });

  it('Should not find a Person that does not exist', async () => {
    const res = await testServer.get('/persons/99999').send();

    expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
