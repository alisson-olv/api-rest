import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - Create', () => {
  it('Should create a new City in database', async () => {
    const res = await testServer.post('/cities').send({
      name: 'São Paulo',
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual('number');
  });

  it('Should not allow creating a City with less than 3 characters', async () => {
    const res = await testServer.post('/cities').send({
      name: 'Ab',
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.name');
  });
});
