export type State = {
  currentProfile: LifeExpectancy
};

export type LifeExpectancy = {
  weeksLeft: number
}

export type Comment = {
  name: string,
  message: string,
  date: Date
}