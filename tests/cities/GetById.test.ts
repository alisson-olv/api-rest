import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

describe('Cities - GetById', () => {
  const token = 'Bearer teste.token';

  it('Should find a City by its id', async () => {
    const res = await testServer
      .post('/cities')
      .set('Authorization', token)
      .send({
        name: 'São Paulo',
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resSearched = await testServer
      .get(`/cities/${res.body}`)
      .set('Authorization', token)
      .send();

    expect(resSearched.statusCode).toEqual(StatusCodes.OK);
    expect(resSearched.body).toHaveProperty('name');
  });

  it('Should not find a City that does not exist', async () => {
    const res = await testServer
      .get('/cities/99999')
      .set('Authorization', token)
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
