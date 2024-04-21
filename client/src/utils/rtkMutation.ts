/* eslint-disable @typescript-eslint/no-explicit-any */

const rtkMutation = async (request: any, credentials: object) => {
  try {
    await request(credentials).unwrap();
  } catch (error) {
    console.log(error);
  }

  //   return { data, errorData };
};

export default rtkMutation;
