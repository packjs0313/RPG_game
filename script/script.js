let HP_st = 0;
let MP_st = 0;
let str_st = 0;
let sk_st = 0;
let stPoint = 3;

let gold = 100;
// HP와 MP
let Max_HP = 100; //최고 HP
let HP = 100; //현 HP
let Max_MP = 100; //최고 MP
let MP = 100; //현 MP
// 레벨 및 경험치 관련
let lv = 1;
let xp_max = 200;
let xp = 0;

//상대 HP와 MP
let enemy_Max_HP = 30;
let enemy_Max_MP = 100;
let enemy_HP = enemy_Max_HP;
let enemy_MP = enemy_Max_MP;
let enemy_lv = 1;

// 레벨 텍스트 갱신 함수
const Lv_text = document.querySelector("#LV");
const Xp_text = document.querySelector("#xp_me");
const name_text = document.querySelector("#my_name");
const Enemy_Lv_text = document.querySelector("#LV_enemy");
const stageText = document.querySelector("#stage");

function text() {
    Lv_text.textContent = `LV.${lv}`;
    Xp_text.textContent = `(${xp}/${xp_max})`;
    stageText.textContent = `STAGE ${stage}`
}
function GoldTextFc() {
    const goldText = document.querySelector("#GoldText");
    const goldText2 = document.querySelector("#GoldText2");

    goldText.textContent = `소지금 : ${gold}`;
    goldText2.textContent = `소지금 : ${gold}`;
}

function enemyLvTextFc() {
    let randomLV;

    if (stage === 1) {
        randomLV = 1;
    } else {
        const minLv = Math.max(1, Math.floor(stage * 0.8));
        const maxLv = Math.floor(stage * 1.2);
        randomLV = Math.floor(Math.random() * (maxLv - minLv + 1)) + minLv;
    }

    enemy_lv = randomLV;
    enemy_Max_HP = 30 + (enemy_lv - 1) * 30;
    enemy_HP = enemy_Max_HP;

    Enemy_Lv_text.textContent = `LV.${randomLV}`;
}
function gainXPFromEnemy() {
    const baseXP = 50;
    const xpGain = Math.floor(baseXP * (enemy_lv / lv)*1.5);
    gainXP(xpGain);
}
function goldFromEnemy() {
    const baseGold = 20;
    const goldGain = Math.floor(baseGold * (enemy_lv / lv) + Math.random() * 10);
    gold_Fc(goldGain);
}

// 경험치 획득/레벨업 함수
function gainXP(amount) {
    xp += amount;
    if (xp >= xp_max) {
        xp -= xp_max;
        lv += 1;
        stPoint += 3;
        xp_max += 200;
        statsTextFc();
        HP_Fc(Max_HP)

        const LEVELUP_Text = document.querySelector("#LEVELUP");
        LEVELUP_Text.style.opacity = '1';
        setTimeout(() => {
            LEVELUP_Text.style.opacity = '0';
        }, 1000);
    }
    text();
}

//스탯 팝업
const st_pop = document.querySelector("#Stats_popup");
function statsPopFcOff() {
    st_pop.classList.add("hide");
}
function statsPopFcOn() {
    st_pop.classList.remove("hide");
}

const st_HP_Text = document.querySelector("#Stats_popup li:nth-child(1) > span:first-child");
const st_MP_Text = document.querySelector("#Stats_popup li:nth-child(2) > span:first-child");
const st_Str_Text = document.querySelector("#Stats_popup li:nth-child(3) > span:first-child");
const st_Sk_Text = document.querySelector("#Stats_popup li:nth-child(4) > span:first-child");
const stets_point_Text = document.querySelector("#skill_point");

function statsTextFc() {
    st_HP_Text.textContent = `HP : ${HP_st}`;
    st_MP_Text.textContent = `MP : ${MP_st}`;
    st_Str_Text.textContent = `공격력 : ${str_st}`;
    st_Sk_Text.textContent = `스킬데미지 : ${sk_st}`;
    stets_point_Text.textContent = `남은 스킬포인트 : ${stPoint}`;
}

//스탯 찍기
function statsHP() {
    if (stPoint > 0) {
        HP_st++;
        stPoint--;

        Max_HP = 100 + (HP_st * 50);
        HP += 50;
        statsTextFc();
        MPHP_Percent();
    }
}
function statsMP() {
    if (stPoint > 0) {
        MP_st++;
        stPoint--;

        Max_MP = 100 + (MP_st * 50);
        MP += 50;
        statsTextFc();
        MPHP_Percent();
    }
}
function statsStr() {
    if (stPoint > 0) {
        str_st++;
        stPoint--;
        statsTextFc();
    }
}
function statsSk() {
    if (stPoint > 0) {
        sk_st++;
        stPoint--;
        statsTextFc();
        SkillSlotText()
    }
}

//스킬 팝업
const Skill_pop = document.querySelector("#skills_popup");
function SkillPopFcOff() {
    Skill_pop.classList.add("hide");
}
function SkillPopFcOn() {
    Skill_pop.classList.remove("hide");
    GoldTextFc();
}

//단축키
document.addEventListener("keydown", () => {

    if(window.event.keyCode === 27){
        statsPopFcOff();
        SkillPopFcOff();
    }else if(window.event.key === "a"){
        statsPopFcOn();
    }else if(window.event.key === "s"){
        SkillPopFcOn();
    }else if(window.event.key ==="q" || window.event.key ==="1" ){
        useSkill(skillslot[0])
    }else if(window.event.key ==="w" || window.event.key ==="2" ){
        useSkill(skillslot[1])
    }else if(window.event.key ==="e" || window.event.key ==="3" ){
        useSkill(skillslot[2])
    }else if(window.event.key ==="r" || window.event.key ==="4" ){
        useSkill(skillslot[3])
    }
})

// 사이트 오픈시 실행
document.addEventListener("DOMContentLoaded", () => {
    const name_text = document.querySelector("#my_name");

    let game_name = "";
    while (true) {
        game_name = prompt("닉네임을 입력하세요 (최대 10글자)") || "";
        game_name = game_name.trim();

        if (game_name && game_name.length <= 10) break;
        alert("닉네임은 1~10글자 사이여야 합니다.");
    }

    name_text.textContent = game_name;

    text();
    GoldTextFc();
    statsTextFc();
    MPHP_Percent();
    enemyLvTextFc();
    RandomMonster();
    updateTurnUI();
});

//HP, MP바 증감
const my_HP_fill = document.querySelector(".me_char .HP_bar .bar_fill");
const my_MP_fill = document.querySelector(".me_char .MP_bar .bar_fill");

const my_HP_text = document.querySelector(".me_char .HP_bar .bar_text");
const my_MP_text = document.querySelector(".me_char .MP_bar .bar_text");

const enemy_HP_fill = document.querySelector(".you_char .HP_bar .bar_fill");
const enemy_MP_fill = document.querySelector(".you_char .MP_bar .bar_fill");

const enemy_HP_text = document.querySelector(".you_char .HP_bar .bar_text");
const enemy_MP_text = document.querySelector(".you_char .MP_bar .bar_text");

function MPHP_Percent() {
    let my_HP_percent = HP / Max_HP * 100;
    let my_MP_percent = MP / Max_MP * 100;

    my_HP_fill.style.width = `${my_HP_percent}%`;
    my_MP_fill.style.width = `${my_MP_percent}%`;

    my_HP_text.textContent = `${HP}/${Max_HP}`;
    my_MP_text.textContent = `${MP}/${Max_MP}`;

    let enemy_HP_percent = enemy_HP / enemy_Max_HP * 100;
    let enemy_MP_percent = enemy_MP / enemy_Max_MP * 100;

    enemy_HP_fill.style.width = `${enemy_HP_percent}%`;
    enemy_MP_fill.style.width = `${enemy_MP_percent}%`;

    enemy_HP_text.textContent = `${enemy_HP}/${enemy_Max_HP}`;
    enemy_MP_text.textContent = `${enemy_MP}/${enemy_Max_MP}`;
}

//HP,MP 증감
function HP_Fc(a) {
    HP += a;
    if (HP > Max_HP) HP = Max_HP;
    if (HP < 0) HP = 0;
    MPHP_Percent();
}
function MP_Fc(a) {
    MP += a;
    if (MP > Max_MP) MP = Max_MP;
    if (MP < 0) MP = 0;
    MPHP_Percent();
}
function enemy_HP_Fc(a) {
    enemy_HP += a;
    if (enemy_HP > enemy_Max_HP) enemy_HP = enemy_Max_HP;
    if (enemy_HP < 0) enemy_HP = 0;
    MPHP_Percent();
}
function enemy_MP_Fc(a) {
    enemy_MP += a;
    if (enemy_MP > enemy_Max_MP) enemy_MP = enemy_Max_MP;
    if (enemy_MP < 0) enemy_MP = 0;
    MPHP_Percent();
}

//골드 증감
function gold_Fc(a) {
    gold += a;
    GoldTextFc();
}

//스킬 목록
const skills = [
    {
        name: "파이어볼",
        price: 100,
        Explanation: "작은 불덩일를 소환하는 기본마법.",
        mana: 10,
        get damage() {
            return 15 + 15 * sk_st;
        },
    },
    {
        name: "아이스샷",
        price: 100,
        Explanation: "작은 고드름을 소환하는 기본마법.",
        mana: 20,
        get damage() {
            return 15 + 20 * sk_st;
        },
    },
    {
        name: "힐",
        price: 300,
        Explanation: "체력을 회복한다",
        mana: 50,
        get damage() {
            return -10 - 25 * sk_st;
        },
    },
    {
        name: "강펀치",
        price: 500,
        Explanation: "주먹에 모든 힘을 담아 강한 공격을 한다.",
        mana: 50,
        get damage() {
            return 20 + 30 * str_st;
        },
    },
    {
        name: "익스플로전 !",
        price: 1000,
        Explanation: "암흑보다 검고, 어둠보다 어두운 칠흑에, 나의 진홍이 섞이기를 바라노라 각성의 때가 왔으니 무류의 경계에 떨어진 이치여 무업의 일그러짐이 되어 나타나라 익스플로전!",
        mana: 500,
        get damage() {
            return 100 + 50 * sk_st;
        },
    },
];

//일반공격
const punch = document.querySelector("#normal_attack");
function punchFc() {
    enemy_HP_Fc(-10 + str_st * -10);
    alert(`상대에게 ${-1 * (-10 + str_st * -10)}의 데미지를 입혔습니다`);
    if (enemy_HP <= 0) {
        dieEnemy();
    } else {
        endTurn(); // 적이 살아 있으면 턴 넘김
    }
}
punch.addEventListener("click", punchFc);

//스킬사용
const skillBtns = document.querySelectorAll(".skillButton");
for (let i = 0; i < skillBtns.length; i++) {
    const btns = skillBtns[i];
    btns.addEventListener('click', () => {
        const skillName = btns.querySelector(".skillName");

        const skill = skills.find(s => s.name === skillName.textContent);
        if (skill) {
            useSkill(skill);
        } else {
            alert("스킬이 장착되지 않았습니다.");
        }
    })
}

function useSkill(skill) {
    if (MP < skill.mana) {
        alert("MP가 부족합니다!");
        return;
    }

    MP_Fc(-skill.mana);

    if (skill.name === "힐") {
        HP_Fc(skill.damage * -1);
        alert(`${skill.name}을 사용하여 체력을 ${skill.damage} 회복했습니다.`);
    }else {
        enemy_HP_Fc(-skill.damage);
        alert(`${skill.name}을 사용하여 적에게 ${skill.damage} 데미지를 입혔습니다.`);
    }

    if (enemy_HP <= 0) {
        dieEnemy();
    } else {
        endTurn(); // 적이 살아 있으면 턴 넘김
    }
}


//스킬구매
const Skill_equipped = document.querySelector(".SkillSlot");
let selectedSkill = "";

function buySkill(buttonElement, buyGold) {
    const skillName = buttonElement.parentElement.querySelector("h1").textContent;
    selectedSkill = skills.find(s => s.name === skillName);

    if (buttonElement.classList.contains("bought")) {//classList.contains는 해당 객체에 class가 있는지 판단
        Skill_equipped.classList.remove("hide");
        return;
    }
    //구매
    if (gold >= buyGold) {
        alert("스킬구매가 완료되었습니다.");
        buttonElement.textContent = `스킬 장착`;
        gold_Fc(-buyGold);

        const goldText = buttonElement.parentElement.querySelector(".Gold");
        goldText.classList.add("hide");
        buttonElement.classList.add("bought");
    } else {
        alert(`골드가 부족합니다 (필요골드 : ${buyGold - gold})`);
    }
}

const skillslot = [null, null, null, null];
let Skill_Slot_index = "";
//슬롯 index감지
const SkillSlot = document.querySelector('.SkillSlot');
function skillSlotIndex(index) {
    SkillSlot.classList.add("hide");
    Skill_Slot_index = index;

    skillEquipped(Skill_Slot_index, selectedSkill);
}
//스킬 장착
function skillEquipped(slot, skill) {
    skillslot[slot] = skill;
    SkillSlotText()
    const slotInSkill = document.querySelector(`#sk${slot + 1}`);

    slotInSkill.classList.add("active")
}
function SkillSlotText() {
    for (let i = 0; i < skillslot.length; i++) {
        const skill = skillslot[i];
        if (!skill) continue;

        const slotInSkillName = document.querySelector(`#sk${i + 1} .skillName`);
        const slotInSkilldamage = document.querySelector(`#sk${i + 1} .skilldamage`);
        const slotInSkillMP = document.querySelector(`#sk${i + 1}>div>span`);

        slotInSkillName.textContent = skill.name;
        slotInSkilldamage.textContent = `데미지 : ${skill.damage}`;
        slotInSkillMP.textContent = `( ${skill.mana}MP )`;
    }
}
//턴제
let stage = 1;
let turn = "player";
// 턴 상태에 따라 버튼 제어
function updateTurnUI() {
    const attackButtons = document.querySelectorAll(".skillButton, #normal_attack");

    for (let i = 0; i < attackButtons.length; i++) {
        attackButtons[i];
        if (turn !== "player") {
            attackButtons[i].classList.add("disabled");
        } else {
            attackButtons[i].classList.remove("disabled");
        }
    }
}

// 턴 전환
function endTurn() {
    if (turn === "player") {
        turn = "enemy";
        MP_Fc(Max_MP / 10);
        updateTurnUI();
        setTimeout(enemyAction, 500); // 1초 후 적의 공격 실행
    } else {
        turn = "player";
        updateTurnUI();
    }
}


// 적턴
function enemyAction() {
    const damage = enemy_lv * 5;
    HP_Fc(-damage);
    alert(`적이 공격했습니다! ${damage} 데미지를 입었습니다.`);
    gameOver()
    endTurn(); // 다시 플레이어 턴으로
}
//적 사망
function dieEnemy() {
    if (enemy_HP <= 0) {
        setTimeout(() => {
            gainXPFromEnemy();
            goldFromEnemy();
            stage++;
            enemy_HP = enemy_Max_HP;
            enemyLvTextFc();
            RandomMonster();
            text();
            GoldTextFc();
            MPHP_Percent();
            MP_Fc(Max_MP / 5);
            turn = "player";
        },500)
    }
}
let enemy_char = [
    {
        name: "슬라임",
        img: "img/slime.png"
    },
    {
        name: "뱀",
        img: "img/snake.png"
    },
    {
        name: "늑대",
        img: "img/wolf.png"
    }
]
//적 캐릭터 선택
function RandomMonster() {
    let random = Math.random()
    let enemy_name = document.querySelector(".you_char .name")
    let enemy_img = document.querySelector(".you_char .char_img")

    if (random <= 0.4) {
        enemy_name.textContent = enemy_char[0].name
        enemy_img.style.backgroundImage = ` url(${enemy_char[0].img})`
    } else if (random <= 0.7) {
        enemy_name.textContent = enemy_char[1].name
        enemy_img.style.backgroundImage = ` url(${enemy_char[1].img})`
    } else if (random <= 1) {
        enemy_name.textContent = enemy_char[2].name
        enemy_img.style.backgroundImage = ` url(${enemy_char[2].img})`
    }
}
//게임오버
function gameOver() {
    const gameOverText = document.querySelector("#gameOver")
    const gameOverStageText = document.querySelector("#Die_stage")
    if (HP === 0) {
        gameOverText.style.display = 'block';
        setTimeout(() => {
            gameOverText.classList.add("action");
            gameOverStageText.textContent = `STAGE ${stage}`
        }, 1);
    }
}