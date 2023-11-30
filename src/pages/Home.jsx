import React, { useState } from "react";

const Home = () => {
  const [gejalaIndex, setGejalaIndex] = useState(0);
  const [certaintyValues, setCertaintyValues] = useState([]);
  const [point, setPoint] = useState(new Array(26).fill(0));
  const [showCertaintyFactor, setShowCertaintyFactor] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [certaintyFactor, setCertaintyFactor] = useState("");

  const questions = [
    "Apakah pasien mengalami perubahan nafsu makan (meningkat/menurun) ?",
    "Apakah pasien mengalami gangguan tidur (sulit tidur atau banyak tidur) ?",
    "Apakah pasien bicara/bergerak lebih lambat ?",
    "Apakah pasien mengalami kehilangan kepercayaan diri?",
    "Apakah pasien merasa bersalah pada diri sendiri ?",
    "Apakah pasien berniat menyakiti diri sendiri / bunuh diri ?",
    "Apakah pasien sering merasa sedih ?",
    "Apakah pasien merasakandada berdebar ?",
    "Apakah pasien sulit bernafas ?",
    "Apakah pasien merasa tercekik ?",
    "Apakah pasien nyeri dan sesak di dada ?",
    "Apakah pasien mual dan gangguan perut ?",
    "Apakah pasien pusing atau sakit kepala ?",
    "Apakah pasien memiliki rasa takut dan khawatir berlebih ?",
    "Apakah pasien mudah tersinggung/curiga kepada orang lain ?",
    "Apakah pasien sulit konsentrasi dalam melakukan kegiatan ?",
    "Apakah pasien mendengar atau melihat yang tidak ada (halusinasi) ?",
    "Apakah pasien kurang bersosialisasi atau tidak mau berinteraksi dengan orang lain ?",
    "Apakah Pasien memiliki keyakinan terhadap sesuatu yang tidak nyata (Delusi) ?",
    "Apakah Pasien sering membicarakan yang tidak masuk akal ?",
    "Apakah pasien memiliki sikap terlalu percaya diri ?",
    "Apakah pasien bicara dengan cepat dan berganti-ganti topik ?",
    "Apakah pasien sering gelisah dan mudah marah ?",
    "Apakah pasien mengalami penurunan kemampuan berperilaku/tidak dapat beraktivitas ?",
    "Apakah pasien sering diam membisu atau sering dengan ekpresi datar/kosong ?",
    "Apakah pasien sering mengalami senang berlebih tanpa sebab ?",
  ];

  const renderQuestion = () => {
    const gejala = questions[gejalaIndex];
    return (
      <div>
        <label className="font-Poppins text-2xl font-extrabold">
          Pertanyaan {gejalaIndex + 1}: Apakah Anda mengalami gejala {gejala}
        </label>
        <div className="pt-6 font-Poppins text-xl" id={`gejala${gejalaIndex}`}>
          <input
            className="px-4"
            type="radio"
            id="ya"
            name="gejala"
            value="ya"
            checked={selectedAnswer === "ya"}
            onChange={() => {
              setSelectedAnswer("ya");
              setCertaintyFactor(""); // Reset certaintyFactor when changing the answer
            }}
          />
          <label className="pr-6 pl-4 text-2xl font-normal" htmlFor="ya">
            Ya
          </label>
          <input
            className="px-4"
            type="radio"
            id="tidak"
            name="gejala"
            value="tidak"
            checked={selectedAnswer === "tidak"}
            onChange={() => {
              setSelectedAnswer("tidak");
              setCertaintyFactor(""); // Reset certaintyFactor when changing the answer
            }}
          />
          <label className="pr-6 pl-4 text-2xl font-normal" htmlFor="tidak">
            Tidak
          </label>
        </div>
      </div>
    );
  };

  const resetOptions = () => {
    setSelectedAnswer(null);
    const certaintyRadios = document.querySelectorAll(
      'input[name="certainty"]'
    );
    certaintyRadios.forEach((radio) => (radio.checked = false));
  };

  const nextQuestion = () => {
    const selectedGejala = document.querySelector(
      'input[name="gejala"]:checked'
    );
    const selectedCertainty = document.querySelector(
      'input[name="certainty"]:checked'
    );

    if (selectedGejala) {
      certaintyValues[gejalaIndex] = selectedGejala.value;

      // Menyimpan nilai ke dalam array point
      if (selectedGejala.value === "ya") {
        point[gejalaIndex] = parseFloat(selectedCertainty.value); // Menggunakan parseFloat untuk mengubah string menjadi angka
      } else {
        point[gejalaIndex] = 0;
      }
      resetOptions();

      console.log("Certainty Factor:", certaintyFactor); // Add this line for debugging

      if (gejalaIndex < questions.length - 1) {
        setGejalaIndex((prevIndex) => prevIndex + 1);
      } else {
        showResults();
      }
    } else {
      handleNoAnswerSelectedError();
    }
  };

  const handleCertaintyInputError = () => {
    alert("Harap isi Certainty Factor sebelum melanjutkan.");
  };

  const handleCertaintyInputElementNotFound = () => {
    console.error("Certainty input element not found.");
  };

  const handleNoAnswerSelectedError = () => {
    alert("Harap pilih jawaban untuk pertanyaan ini.");
  };

  const prevQuestion = () => {
    resetOptions();

    if (gejalaIndex > 0) {
      setGejalaIndex((prevIndex) => prevIndex - 1);
    } else {
      alert("Ini adalah pertanyaan pertama.");
    }
  };

  const min = (...values) => {
    let minValue = Number.MAX_VALUE;
    for (const value of values) {
      if (value < minValue) {
        minValue = value;
      }
    }
    return minValue;
  };

  const showResults = () => {
    // Rule penentuan penyakit
    const rule = new Array(9);
    rule[0] =
      min(
        point[0],
        point[1],
        point[2],
        point[3],
        point[4],
        point[5],
        point[6],
        point[15]
      ) * 0.81;
    rule[1] =
      min(
        point[0],
        point[1],
        point[2],
        point[3],
        point[4],
        point[5],
        point[6],
        point[14],
        point[17],
        point[18]
      ) * 0.79;
    rule[2] =
      min(
        point[1],
        point[7],
        point[8],
        point[9],
        point[10],
        point[11],
        point[12],
        point[13]
      ) * 0.85;
    rule[3] =
      min(
        point[1],
        point[16],
        point[17],
        point[18],
        point[19],
        point[22],
        point[23],
        point[25]
      ) * 0.93;
    rule[4] =
      min(point[2], point[15], point[17], point[19], point[23], point[24]) *
      0.9;
    rule[5] = min(point[2], point[16], point[18], point[19], point[23]) * 0.96;
    rule[6] = min(point[2], point[17], point[19], point[23], point[24]) * 0.92;
    rule[7] =
      min(
        point[1],
        point[4],
        point[6],
        point[14],
        point[15],
        point[17],
        point[19],
        point[20],
        point[22],
        point[25]
      ) * 0.78;
    rule[8] =
      min(
        point[1],
        point[4],
        point[6],
        point[14],
        point[15],
        point[23],
        point[25]
      ) * 0.83;

    // Menghitung nilai keyakinan penyakit
    console.log("Rule 0-1:", rule[0], rule[1]);
    const P01 = rule[0] + rule[1] * (1 - rule[0]);
    console.log("P01:", P01);

    console.log("Rule 2:", rule[2]);
    const P02 = rule[2] * (1 - rule[2]);
    console.log("P02:", P02);

    console.log("Rule 3-6:", rule[3], rule[4], rule[5], rule[6]);
    const P03 = rule[3] + rule[4] + rule[5] + rule[6] * (1 - rule[3]);
    console.log("P03:", P03);

    console.log("Rule 7-8:", rule[7], rule[8]);
    const P04 = rule[7] + rule[8] * (1 - rule[7]);
    console.log("P04:", P04);

    // Menentukan hasil diagnosis
    let diagnosis = "";
    if (P01 > 0) {
      diagnosis =
        "Diagnosis: Gangguan Depresi dengan tingkat keyakinan system " +
        P01 * 100 +
        "%";
    } else if (P02 > 0) {
      diagnosis =
        "Diagnosis: Gangguan Kecemasan  dengan tingkat keyakinan system " +
        P02 * 100 +
        "%";
    } else if (P03 > 0) {
      diagnosis =
        "Diagnosis: Gangguan Bipolar dengan tingkat keyakinan system " +
        P03 * 100 +
        "%";
    } else if (P04 > 0) {
      diagnosis =
        "Diagnosis: Gangguan PTSD dengan tingkat keyakinan system " +
        P04 * 100 +
        "%";
    } else {
      diagnosis = "Tidak dapat menentukan diagnosis";
    }

    // Menampilkan hasil
    const resultText = document.getElementById("resultText");
    resultText.textContent = diagnosis;

    // Menampilkan div hasil
    const resultsDiv = document.getElementById("results");
    resultsDiv.style.display = "block";

    // Menyembunyikan form pertanyaan
    const form = document.getElementById("diagnosisForm");
    form.style.display = "none";
  };
  return (
    <div className="font-Poppins flex flex-col bg-[url('https://res.cloudinary.com/dnyrrcacd/image/upload/v1698562173/BEM/History_Proker_Admin_eucsau.svg')]">
      <div className="m-12 mb-80">
        <div className=" flex items-center justify-center text-4xl font-semibold pb-12">
          <div className="font-Poppins pt-24">Diagnosis Gangguan Mental</div>
        </div>
        <div className="font-semibold font-Poppins text-2xl pt-24">
          Berikut akan ditampilkan pertanyaan terkait gejala yang Anda alami.
        </div>

        <form id="diagnosisForm">
          <fieldset>
            <legend className="pt-4"></legend>
            <div id="gejalaContainer">{renderQuestion()}</div>
          </fieldset>

          <fieldset id="certaintyFactorContainer">
            <legend className="text-2xl pt-8 pb-6 font-semibold">
              Pilihan Jawaban :{" "}
            </legend>
            <label htmlFor="certaintyFactor" className="text-xl ">
              Seberapa Sering Anda Mengalami?
            </label>
            <div
              className="pt-4 flex text-lg font-extrabold"
              id="certaintyFactor"
            >
              <input type="radio" id="tidakPasti" name="certainty" value="0" />
              <label className="px-2 " htmlFor="tidakPasti">
                Tidak Pasti
              </label>

              <input
                type="radio"
                id="hampirTidakPasti"
                name="certainty"
                value="0.2"
              />
              <label className="px-2 " htmlFor="hampirTidakPasti">
                Hampir Tidak Pasti
              </label>

              <input
                type="radio"
                id="kemungkinanBesarTidak"
                name="certainty"
                value="0.3"
              />
              <label className="px-2 " htmlFor="kemungkinanBesarTidak">
                Kemungkinan Besar Tidak
              </label>

              <input
                type="radio"
                id="mungkinTidak"
                name="certainty"
                value="0.4"
              />
              <label className="px-2 " htmlFor="mungkinTidak">
                Mungkin Tidak
              </label>

              <input
                type="radio"
                id="kemungkinanKecil"
                name="certainty"
                value="0.5"
              />
              <label className="px-2 " htmlFor="kemungkinanKecil">
                Kemungkinan Kecil
              </label>

              <input type="radio" id="mungkin" name="certainty" value="0.6" />
              <label className="px-2 " htmlFor="mungkin">
                Mungkin
              </label>

              <input
                type="radio"
                id="kemungkinanBesar"
                name="certainty"
                value="0.7"
              />
              <label className="px-2 " htmlFor="kemungkinanBesar">
                Kemungkinan Besar
              </label>

              <input
                type="radio"
                id="hampirPasti"
                name="certainty"
                value="0.8"
              />
              <label className="px-2 " htmlFor="hampirPasti">
                Hampir Pasti
              </label>

              <input type="radio" id="pasti" name="certainty" value="1.0" />
              <label className="px-2 " htmlFor="pasti">
                Pasti
              </label>
            </div>
          </fieldset>
          <button
            className="bg-green-rift p-2 mt-12 rounded-xl text-white mr-4"
            type="button"
            onClick={prevQuestion}
          >
            Pertanyaan Sebelumnya
          </button>
          <button
            className="bg-green-rift p-2 rounded-xl text-white ml-4"
            type="button"
            onClick={nextQuestion}
          >
            Pertanyaan Berikutnya
          </button>
        </form>

        <div id="results" className="hidden mb-60">
          <h2 className="pb-6 pt-24 text-green-rift text-4xl font-extrabold">
            Hasil Diagnosis :
          </h2>
          <p id="resultText" className="font-bold text-3xl"></p>
        </div>
      </div>
    </div>
  );
};

export default Home;
