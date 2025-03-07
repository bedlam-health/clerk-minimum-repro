export enum ClientAge {
  Children_0_5 = "children_0_5",
  Children_6_10 = "children_6_10",
  Preteens_11_13 = "preteens_11_13",
  Adolescents_14_18 = "adolescents_14_18",
  YoungAdults_19_24 = "young_adults_19_24",
  Adults_25_64 = "adults_25_64",
  OlderAdults_65_Plus = "older_adults_65_plus",
}

export const ClientAgeMap: Record<ClientAge, string> = {
  [ClientAge.Children_0_5]: "Children (0 to 5)",
  [ClientAge.Children_6_10]: "Children (6 to 10)",
  [ClientAge.Preteens_11_13]: "Preteens (11 to 13)",
  [ClientAge.Adolescents_14_18]: "Adolescents (14 to 18)",
  [ClientAge.YoungAdults_19_24]: "Young Adults (19 to 24)",
  [ClientAge.Adults_25_64]: "Adults (25 to 64)",
  [ClientAge.OlderAdults_65_Plus]: "Older Adults (65 +)",
}
export enum Gender {
  FemaleCis = "female_cis",
  FemaleTrans = "female_trans",
  MaleCis = "male_cis",
  MaleTrans = "male_trans",
  NonBinary = "non_binary",
  Other = "other",
}

export const GenderMap: Record<Gender, string> = {
  [Gender.FemaleCis]: "female (cis)",
  [Gender.FemaleTrans]: "female (trans)",
  [Gender.MaleCis]: "male (cis)",
  [Gender.MaleTrans]: "male (trans)",
  [Gender.NonBinary]: "non-binary",
  [Gender.Other]: "other",
}

export enum Pronouns {
  SheHer = "she/her",
  HeHim = "he/him",
  TheyThem = "they/them",
  Other = "other",
}

export const language = [
  "American Sign Language (ASL)",
  "Arabic",
  "Armenian",
  "Bosnian",
  "Cantonese",
  "Creole",
  "Croatian",
  "Dutch",
  "Farsi",
  "Filipino",
  "French",
  "German",
  "Greek",
  "Gujarati",
  "Hebrew",
  "Hindi",
  "Hungarian",
  "Italian",
  "Japanese",
  "Korean",
  "Mandarin",
  "Polish",
  "Portuguese",
  "Punjabi",
  "Romanian",
  "Russian",
  "Serbian",
  "Sinhalese",
  "Spanish",
  "Turkish",
  "Ukranian",
  "Urdu",
  "Vietnamese",
  "Yiddish",
]
