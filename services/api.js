
const FACT_URL =
  'https://api.adviceslip.com/advice';

export async function fetchMoneyFact() {
  try {
    const response = await fetch(FACT_URL, {
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(
        `Server responded with ${response.status}`
      );
    }

    const data = await response.json();

    return {
      success: true,
      fact: data.slip.advice,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}