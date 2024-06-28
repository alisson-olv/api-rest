import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Persons - GetById', () => {
  let cityId: number | undefined = undefined;
  const token = 'Bearer teste.token';

  beforeAll(async () => {
    const res = await testServer
      .post('/cities')
      .set('Authorization', token)
      .send({
        name: 'Any City',
      });

    cityId = res.body;
  });

  it('Should find a Person by its id', async () => {
    const res = await testServer
      .post('/persons')
      .set('Authorization', token)
      .send({
        cityId,
        email: 'binho_alisson@hotmail.com',
        fullName: 'Alisson Souza',
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resSearched = await testServer
      .get(`/persons/${res.body}`)
      .set('Authorization', token)
      .send();

    expect(resSearched.status).toEqual(StatusCodes.OK);
    expect(resSearched.body).toHaveProperty('email');
    expect(resSearched.body).toHaveProperty('cityId');
    expect(resSearched.body).toHaveProperty('fullName');
  });

  it('Should not find a Person that does not exist', async () => {
    const res = await testServer
      .get('/persons/99999')
      .set('Authorization', token)
      .send();

    expect(res.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
