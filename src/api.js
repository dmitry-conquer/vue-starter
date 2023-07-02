export const getDog = async () => {
  try {
    const response = await fetch("https://random.dog/woof.json");
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.log(error);
  }
};
