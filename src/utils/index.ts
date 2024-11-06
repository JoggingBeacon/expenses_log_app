/**
 * @returns two dimension array based
 * on the date group
 */
export function dateGroup(trans: Transaction[]) {
  let result: Transaction[][] = [];
  let index: number;
  // Loop through the array
  let unique: string[] = [];
  for (let i = 0; i < trans.length; i++) {
    const { date, month } = formatToLocal(trans[i].created_at);
    let dateMonth = `${date} ${month}`;

    // Check if the date is in result
    index = unique.indexOf(dateMonth);

    // If date month is not unique
    // Append with the given index

    // If unique, added to unique
    // And push to the root array
    if (index !== -1) {
      result[index].push(trans[i]);
    } else {
      unique.push(dateMonth);
      result.push([trans[i]]);
    }
  }

  return result;
}

export function formatToLocal(dateTimeISO: string | null) {
  if (!dateTimeISO) {
    return {
      day: "",
      date: "",
      month: "",
      year: "",
      time: "",
    };
  }
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  // return akan seperti Minggu, 24 januari 2024
  //   buat instansi Date
  const dt = new Date(dateTimeISO);
  // ambil hari (format)
  const day = days[dt.getDay()];
  // ambil tanggal
  const date = dt.getDate();
  // ambil bulan (format)
  const month = months[dt.getMonth()];
  // ambil tahun
  const year = dt.getFullYear();
  // format waktu
  const time = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}`;

  return {
    day: day,
    date: date,
    month: month,
    year: year,
    time: time,
  };
}

export function formatThousands(x?: number | string) {
  if (!x) return "";
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}
