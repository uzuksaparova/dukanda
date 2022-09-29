import React from 'react';
import { BsCreditCard } from 'react-icons/bs';
import { MdPhone, MdWeb } from 'react-icons/md';
import {
    AiFillCreditCard,
    AiOutlineQrcode,
    AiOutlineSlack,
} from 'react-icons/ai';
import { RiCurrencyFill, RiQrCodeLine } from 'react-icons/ri';
import { HiOutlineQrcode } from 'react-icons/hi';
import { ImLocation2 } from 'react-icons/im';
import {
    FaAddressCard,
    FaBirthdayCake,
    FaBuilding,
    FaCity,
    FaPercent,
    FaUserAlt,
} from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { BiRename } from 'react-icons/bi';
import './clientTab1.scss';

function ClientTab1(props) {
    const { clientData } = props;
    const lineNameTranslator = (name, value) => {
        switch (name) {
            case 'active':
                return {
                    leftIcon: <AiOutlineSlack className="row-icon" />,
                    leftName: 'Aktiw',
                    rightValue: value ? 'Aktiw' : 'Passiw',
                };
            case 'code':
                return {
                    leftIcon: <AiOutlineQrcode className="row-icon" />,
                    leftName: 'Kody',
                    rightValue: value,
                };
            case 'name':
            case 'name2':
                return {
                    leftIcon: <BiRename className="row-icon" />,
                    leftName: 'Ady',
                    rightValue: value,
                };
            case 'phoneNumber':
            case 'phoneNumber2':
                return {
                    leftIcon: <MdPhone className="row-icon" />,
                    leftName: 'Telefon',
                    rightValue: value,
                };
            case 'cardType':
                return {
                    leftIcon: <AiFillCreditCard className="row-icon" />,
                    leftName: 'Kart görnüşi',
                    rightValue: value,
                };
            case 'eCode':
                return {
                    leftIcon: <HiOutlineQrcode className="row-icon" />,
                    leftName: 'E kody',
                    rightValue: value,
                };
            case 'address':
            case 'address2':
                return {
                    leftIcon: <FaAddressCard className="row-icon" />,
                    leftName: 'Adres',
                    rightValue: value,
                };
            case 'district':
                return {
                    leftIcon: <ImLocation2 className="row-icon" />,
                    leftName: 'Bölge',
                    rightValue: value,
                };
            case 'town':
                return {
                    leftIcon: <ImLocation2 className="row-icon" />,
                    leftName: 'Etrap',
                    rightValue: value,
                };
            case 'city':
                return {
                    leftIcon: <FaCity className="row-icon" />,
                    leftName: 'Şäher',
                    rightValue: value,
                };
            case 'cityCode':
                return {
                    leftIcon: <RiQrCodeLine className="row-icon" />,
                    leftName: 'Şäher kody',
                    rightValue: value,
                };
            case 'country':
                return {
                    leftIcon: <ImLocation2 className="row-icon" />,
                    leftName: 'Ýurt',
                    rightValue: value,
                };
            case 'countryCode':
                return {
                    leftIcon: <RiQrCodeLine className="row-icon" />,
                    leftName: 'Ýurt kody',
                    rightValue: value,
                };
            case 'division':
                return {
                    leftIcon: <FaBuilding className="row-icon" />,
                    leftName: 'Bölümi',
                    rightValue: value,
                };
            case 'email':
            case 'email2':
            case 'email3':
                return {
                    leftIcon: <GrMail className="row-icon" />,
                    leftName: 'E poçta',
                    rightValue: value,
                };
            case 'incharge':
            case 'incharge2':
            case 'incharge3':
                return {
                    leftIcon: <BsFillInfoCircleFill className="row-icon" />,
                    leftName: 'Ilgili Maglumat',
                    rightValue: value,
                };
            case 'webAddress':
                return {
                    leftIcon: <MdWeb className="row-icon" />,
                    leftName: 'Web adresi',
                    rightValue: value,
                };
            case 'birthDate':
                return {
                    leftIcon: <FaBirthdayCake className="row-icon" />,
                    leftName: 'Doglan güni',
                    rightValue: value,
                };
            case 'currency':
                return {
                    leftIcon: <RiCurrencyFill className="row-icon" />,
                    leftName: 'İşlem dövüz para birimi',
                    rightValue: value.name,
                };
            case 'displayCurrency':
                return {
                    leftIcon: <RiCurrencyFill className="row-icon" />,
                    leftName:
                        'Müşderiniň E-commerce-de görýän bahasynyň pul birligi',
                    rightValue: value.name,
                };
            case 'exchangeRateType':
                return {
                    leftIcon: <RiCurrencyFill className="row-icon" />,
                    leftName: 'Pul çalşygy görnüşi',
                    rightValue: value,
                };
            case 'discount':
                return {
                    leftIcon: <FaPercent className="row-icon" />,
                    leftName: 'Arzanladyş',
                    rightValue: value,
                };
            case 'specode':
            case 'specode2':
            case 'specode3':
            case 'specode4':
            case 'specode5':
                return {
                    leftIcon: <HiOutlineQrcode className="row-icon" />,
                    leftName: 'Özel kodu',
                    rightValue: value,
                };
            case 'cyphcode':
                return {
                    leftIcon: <HiOutlineQrcode className="row-icon" />,
                    leftName: 'Müşderi yetki kody',
                    rightValue: value,
                };
            case 'cardNo':
                return {
                    leftIcon: <BsCreditCard className="row-icon" />,
                    leftName: 'Kart Nomeri',
                    rightValue: value,
                };
            case 'userName':
                return {
                    leftIcon: <FaUserAlt className="row-icon" />,
                    leftName: 'Ulanyjy ady',
                    rightValue: value,
                };
            default:
                return null;
        }
    };

    let clientInfoRow = (name, value) => {
        let clientObj = lineNameTranslator(name, value);
        if (clientObj) {
            const { leftIcon, leftName, rightValue } = clientObj;

            return (
                <div className="one-row-client ">
                    <div className="left">
                        {leftIcon}
                        <span> {leftName}</span>
                    </div>
                    <div className="right">{rightValue}</div>
                </div>
            );
        }
        return null;
    };
    return (
        <div className="client-tab1">
            {Object.keys(clientData).length
                ? Object.keys(clientData).map((cd, i) => {
                      return clientData[cd] &&
                          clientData[cd] !== '0' &&
                          clientData[cd] !== 0
                          ? clientInfoRow(cd, clientData[cd])
                          : null;
                  })
                : null}
        </div>
    );
}

export default ClientTab1;
