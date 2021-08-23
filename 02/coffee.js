const coffeesList = [
    {
        href: 'sssfnjk',
        content: '拿铁'
    },
    {
        href: 'sssfnjk',
        content: '卡布奇诺'
    },
    {
        href: 'sssfnjk',
        content: '锐澳白'
    },
    {
        href: 'sssfnjk',
        content: '美式咖啡'
    },
]

class Coffee extends HTMLElement {
    constructor(){
        super();
        this.initialNode();
    }

    initialNode(){
        // this.attachShadow({ mode: 'close' });

        const vNodeItem = document.createElement('div');
        const ul = document.createElement('ul');

        ul.appendChild(this.coffeeConllection(coffeesList));
        vNodeItem.appendChild(ul);

        this.register(vNodeItem);
    }

    register(node){
        this.appendChild(node)
    }

    coffeeItemNode(coffee){
        const coffeeItem = document.createElement('li');
        const coffeeItemLink = document.createElement('a');

        coffeeItemLink.href = coffee.href ? coffee.href : null;

        // coffeeItem.appendChild(coffeeItemLink);
        coffeeItem.innerHTML = coffee.content || '';
        coffeeItemLink.appendChild(coffeeItem)

        return coffeeItemLink;
    }

    coffeeConllection(coffees = []){
        const fragment = document.createElement('fragment');
        coffees.forEach(coffee => {
            fragment.appendChild(this.coffeeItemNode(coffee));
        });
        return fragment;
    }
}
