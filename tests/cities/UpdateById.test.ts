import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

describe('Cities - UpdateById', () => {
  const token = 'Bearer teste.token';

  it('Should update one City', async () => {
    const res = await testServer
      .post('/cities')
      .set('Authorization', token)
      .send({
        name: 'São Paulo',
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdated = await testServer
      .put(`/cities/${res.body}`)
      .set('Authorization', token)
      .send({
        name: 'Santos',
      });

    expect(resUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Should not update a City that does not exist', async () => {
    const res = await testServer
      .put('/cities/99999')
      .set('Authorization', token)
      .send({
        name: 'São Paulo',
      });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });
});
