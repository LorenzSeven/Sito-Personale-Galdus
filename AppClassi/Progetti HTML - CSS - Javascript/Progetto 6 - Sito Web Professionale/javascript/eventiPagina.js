function giorno()
{
    document.documentElement.setAttribute('data-theme', "light");
    localStorage.setItem('theme', "light");
}
function notte()
{
    document.documentElement.setAttribute('data-theme', "dark");
    localStorage.setItem('theme', "dark");
}