import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Persons - GetAll', () => {
  let cityId: number | undefined = undefined;
  const token = 'Bearer teste.token';

  beforeAll(async () => {
    const resCity = await testServer
      .post('/cities')
      .set('Authorization', token)
      .send({
        name: 'Any City Name',
      });

    cityId = resCity.body;
  });

  it('Should get all Persons', async () => {
    const res = await testServer
      .post('/persons')
      .set('Authorization', token)
      .send({
        cityId,
        email: 'binho_getAll@hotmail.com',
        fullName: 'Alisson Souza',
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resSearched = await testServer
      .get('/persons')
      .set('Authorization', token)
      .send();

    expect(Number(resSearched.header['x-total-count'])).toBeGreaterThan(0);
    expect(resSearched.statusCode).toEqual(StatusCodes.OK);
    expect(resSearched.body.length).toBeGreaterThan(0);
  });
});
