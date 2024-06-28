import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

describe('Persons - UpdateById', () => {
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

  it('Should update one Person', async () => {
    const res = await testServer
      .post('/persons')
      .set('Authorization', token)
      .send({
        cityId,
        email: 'binho_alisson@hotmail.com',
        fullName: 'Alisson Souza',
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdated = await testServer
      .put(`/persons/${res.body}`)
      .set('Authorization', token)
      .send({
        cityId,
        email: 'binho@hotmail.com',
        fullName: 'Alisson',
      });

    expect(resUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Should not update a Person that does not exist', async () => {
    const res = await testServer
      .put('/persons/99999')
      .set('Authorization', token)
      .send({
        cityId,
        email: 'binho_alisson@hotmail.com',
        fullName: 'Alisson Souza',
      });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
