
export default {
async createCategory(input_data) {
    console.log("Post input data", input_data);
    return new Promise((resolve, reject) => {
        axios.post('/api/v2/categories/', input_data).then((response) => {
          resolve(response.data);
        }).catch((error) => {
          reject(error.response.data);
        });
      });
    // console.log(new_cat);
    // setStatus(() => {
    //     new_cat.status === "200" ? true : false
    // })

    }
}
