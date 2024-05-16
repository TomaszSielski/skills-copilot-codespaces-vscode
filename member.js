function skillsMember() {
  const member = document.querySelector('.member');
  const memberSkills = document.querySelector('.member-skills');

  if (member) {
    member.addEventListener('click', function () {
      memberSkills.classList.toggle('active');
    });
  }
}