function luminosita()
{
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme == "light") //notte
    {
        document.documentElement.setAttribute('data-theme', "dark");
        localStorage.setItem('theme', "dark");
    }
    else if (currentTheme == "dark")//giorno
    {
        document.documentElement.setAttribute('data-theme', "light");
        localStorage.setItem('theme', "light");
    }
}