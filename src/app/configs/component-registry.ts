export const componentRegistry: {
  [collectionName: string]: () => Promise<any>
} = {
  proposals: () => import('../core/cards/proposal-card/proposal-card')
    .then(m => m.ProposalCard),
  specialities: () => import('../core/cards/speciality-card/speciality-card')
    .then(m => m.SpecialityCard),
  categories: () => import('../core/cards/category-card/category-card')
    .then(m => m.CategoryCard),
  jobs: () => import('../core/cards/job-card/job-card')
    .then(m => m.JobCard),
  users: () => import('../core/cards/user-card/user-card')
    .then(m => m.UserCard),
  portfolioitems: () => import('../core/cards/portfolio-card/portfolio-card')
    .then(m => m.PortfolioCard),
};