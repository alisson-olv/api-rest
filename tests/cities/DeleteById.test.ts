import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - DeleteById', () => {
  it('Should delete one City by it Id', async () => {
    const res = await testServer.post('/cities').send({
      name: 'São Paulo',
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resDeleted = await testServer.delete(`/cities/${res.body}`).send();

    expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Should dont delete a City that dont exists', async () => {
    const res = await testServer.delete('/cities/99999').send();

    expect(res.status).toEqual(StatusCodes.NOT_FOUND);
    expect(res.body).toHaveProperty('errors.default');
  });
});
