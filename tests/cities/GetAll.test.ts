import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - GetAll', () => {
  it('Should get all Cities', async () => {
    const res = await testServer.post('/cities').send({
      name: 'São Paulo',
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resSearched = await testServer.get('/cities').send();

    expect(Number(resSearched.header['x-total-count'])).toBeGreaterThan(0);
    expect(resSearched.statusCode).toEqual(StatusCodes.OK);
    expect(resSearched.body.length).toBeGreaterThan(0);
  });
});
