import Head from 'next/head';
import { memo } from 'react';

function About() {
    return (
        <>
            <Head>
                <title>About | The Building</title>
            </Head>
            <div className="opacity-scale-appear h-full w-full overflow-y-auto px-8 py-4 lg:px-32 lg:py-8">
                <h1 className="pb-2 text-4xl font-bold">About</h1>

                <div>
                    <h2 className="pb-4 text-2xl text-typo-secondary">
                        The Project
                    </h2>
                    <img
                        src="https://grupityanaygrouptlv.com/wp-content/uploads/2023/04/house-1.jpg"
                        alt=""
                        className="float-left mb-8 mr-16 w-full rounded-md md:w-1/3"
                    />
                    <h3 className="mb-2 text-2xl font-bold">אודות הפריוקט</h3>
                    <p className="mb-2 text-xl">
                        ברוכים הבאים לבית הבא שלכם בתל-אביב בשכונת צהלה היוקרתית
                        בליבה הפועם של העיר.
                    </p>
                    <p className="mb-2 text-xl">
                        חווית מגורים ייחודית בנוסף לאיכות חיים גבוהה! במיקום
                        מדהים בשכונה שמרביתם של המבנים הינם בתים פרטיים או דו
                        משפחתיים, התושבים נהנים מקהילה חמה ומגוונת, נגישות הליכה
                        לבית הספר, גני הילדים, מרכז מסחרי שכונתי, גינות רבות לצד
                        פינות טבע מרגשות.
                    </p>
                    <p className="mb-2 text-xl">
                        דירות גדולות ומרווחות 5-6 חדרים. פנטהאוז וגן החל מ 124
                        מר בנוי + גינה/מרפסת שמש. 2 דירות בקומה בלבד.
                    </p>
                    <p className="mb-2 text-xl">
                        דירות מרווחות ביותר, ומעוצבות ברמה הגבוה. מפרט טכני עשיר
                        ומפנק אפשרות לשינויים לפי טעמכם אכלוס 08/2025 ליווי
                        בנקאי מלא לפרויקט תנאי תשלום נוחים מאוד
                    </p>
                </div>
                <div className="clear-left py-4">
                    <h2 className="mb-4 text-2xl text-typo-secondary">
                        The Developer
                    </h2>
                    <img
                        src="https://grupityanaygrouptlv.com/wp-content/uploads/2023/04/yanay-group-logo.png"
                        alt=""
                        className="float-right mb-8 ml-16 w-full rounded-md md:w-1/4"
                    />
                    <p className="text-xl">
                        מי אנחנו משרדנו קיים כבר משנת 2015.משרדנו מתמחה בעיקר
                        באזור רמת גן-גבעתיים — במכירה \ והשכרת נכסים חדשים ויד
                        2.-שיווק פרויקטים-התחדשות עירונית- ניהול נכסים משרדנו שם
                        דגש גדול על אמינות,ישירות,ושקיפות אלו הם אבני הדרך שלנו.
                        אחרי לא מעט עסקאות מכר,שכירות,נשמח להקל לכם את התהליך
                        קניה,השכרה נכס אחרי הבנה מעמיקה של הצרכים שלכם. מכירה
                        הנכס שלכם תוך כדי התאמת מחיר הנכס למצב של השוק,הערכת
                        נכס,ואסטרטגית שיווק ופרסום שפותחה על ידי משרדנו.על מנת
                        למקסם את מכירת,קניית הנכס הכי יקר לכם. משרדנו נותן
                        שירותים גם בשפה הרוסית ואנגלית
                    </p>
                </div>
            </div>
        </>
    );
}

export default memo(About);
