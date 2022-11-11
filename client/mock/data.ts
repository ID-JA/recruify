export const EMPLOYMENT_TYPES = [
  { value: 'full_time', label: 'Full Time' },
  { value: 'part_time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'internship', label: 'Internship' },
  { value: 'other', label: 'Other' },
]

// method to convert array of strings to array of objects with value and label
export const convertToProfessionalSkillOptions = (arr: string[]) => {
  return arr?.map((element) => {
    return {
      value: element,
      label: element,
    }
  })
}
