export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  const headerOffset = 80 // Account for fixed header
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}