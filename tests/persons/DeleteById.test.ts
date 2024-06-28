import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Persons - DeleteById', () => {
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

  it('Should delete one Person by it Id', async () => {
    const res = await testServer
      .post('/persons')
      .set('Authorization', token)
      .send({
        cityId,
        email: 'binho_alisson@hotmail.com',
        fullName: 'Alisson Souza',
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resDeleted = await testServer
      .delete(`/persons/${res.body}`)
      .set('Authorization', token)
      .send();

    expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Should dont delete a Persons that dont exists', async () => {
    const res = await testServer
      .delete('/persons/99999')
      .set('Authorization', token)
      .send();

    expect(res.status).toEqual(StatusCodes.NOT_FOUND);
    expect(res.body).toHaveProperty('errors.default');
  });
});
