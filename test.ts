// přípraví defaultní položky menu a rozdělí je na dvě části, aby se mohly vkládat další položky mezi ně
function pripravDefaultPolozkyMenu(defaultPolozky: string[], vlozitPolozkyZaPrvek: number) {
    const prvniCastMenu = defaultPolozky.slice(0, vlozitPolozkyZaPrvek);
    const druhaCastMenu = defaultPolozky.slice(vlozitPolozkyZaPrvek);
    return { prvniCastMenu, druhaCastMenu };
}

// přípraví proměnné pro položky menu
function pripravPromennePolozkyMenu(zobrazit: boolean, nadrizenyUzelProMenu:string, polozkyMenu: string[]) {
    return { zobrazit,nadrizenyUzelProMenu,polozkyMenu };
}

// vrátí položky menu podle podmíněných položek, tato metoda nepočítá s tím, že by menu mohlo být více jak 2 úrovné
function vratPolozkyMenu(defaultniPolozkyMenu:string[], prvniCastMenu:string[], druhaCastMenu:string[], podminenePolozkyMenu:any[]) {
    const nalezenePolozkyMenu = podminenePolozkyMenu.filter(i => i.zobrazit === true);
     
    if (nalezenePolozkyMenu.length === 0) {
        return [...prvniCastMenu,...druhaCastMenu]
    } else if (nalezenePolozkyMenu.length === 1) {
        return [...prvniCastMenu,...nalezenePolozkyMenu[0].polozkyMenu,...druhaCastMenu]
    } else {
        const polozky = nalezenePolozkyMenu.flatMap(item => [
            item.nadrizenyUzelProMenu,
            ...item.polozkyMenu.map(polozka=> polozka + "_změněná")
        ])
        return [...prvniCastMenu,...polozky,...druhaCastMenu]
    }
}


let defaultniPolozkyMenu = ["a", "b", "c", "d", "e", "f"];
const {prvniCastMenu, druhaCastMenu } = pripravDefaultPolozkyMenu(defaultniPolozkyMenu, 4);

const byty = pripravPromennePolozkyMenu(false, "BYTY", ["1", "2", "3", "4", "5"]);
const nebyty = pripravPromennePolozkyMenu(false, "NEBYTY", ["6", "7", "8", "9", "10"]);
const komerce = pripravPromennePolozkyMenu(true, "KOMERCE", ["11", "12", "13", "14", "15"]);
const rn = pripravPromennePolozkyMenu(false, "RN", ["16", "17", "18", "19", "20"]);
const podminenePolozkyMenu = [byty,nebyty,komerce,rn];
const vysledek = vratPolozkyMenu(defaultniPolozkyMenu, prvniCastMenu, druhaCastMenu, podminenePolozkyMenu);
 