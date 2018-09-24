import React, { Component } from 'react';

import {
    Alignment,
    Button,
    Classes,
    H5,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Switch,
    IconName,
    ButtonGroup,
    Popover,
    Position,
    Menu,
    MenuItem,
    MenuDivider,
    Icon,
    Tabs,
    Tab,
    Intent,
    Card,
    InputGroup,
    FormGroup,
    PopoverInteractionKind
} from "@blueprintjs/core";

import { DateInput } from "@blueprintjs/datetime";
import moment from "moment";
import "moment/locale/pt-br"

import { Select } from "@blueprintjs/select";

import { IconNames } from '@blueprintjs/icons';
import { ICON } from '@blueprintjs/core/lib/esm/common/classes';

import MomentLocaleUtils from 'react-day-picker/moment';

const readers = [
    { title: "R420" },
    { title: "XSPAN" },
    { title: "RPAD" }
]

const readerRenderer = (reader, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }

    const text = `${reader.title}`;

    return (
        <MenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            key={reader.title}
            onClick={handleClick}
            text={highlightText(text, query)}
        />
    );
};

function highlightText(text, query) {
    let lastIndex = 0;
    const words = query
        .split(/\s+/)
        .filter(word => word.length > 0)
        .map(escapeRegExpChars);
    if (words.length === 0) {
        return [text];
    }
    const regexp = new RegExp(words.join("|"), "gi");
    const tokens = [];

    while (true) {
        const match = regexp.exec(text);
        if (!match) {
            break;
        }
        const length = match[0].length;
        const before = text.slice(lastIndex, regexp.lastIndex - length);
        if (before.length > 0) {
            tokens.push(before);
        }
        lastIndex = regexp.lastIndex;
        tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
    }

    const rest = text.slice(lastIndex);

    if (rest.length > 0) {
        tokens.push(rest);
    }

    return tokens;
}

const readerFilter = (query, reader) => {
    return `${reader.title}`.toLowerCase().indexOf(query.toLowerCase()) >= 0;
};

function escapeRegExpChars(text) {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function getMomentFormatter(format) {
    return {
        formatDate: (date, locale) => moment(date).locale(locale).format(format),
        parseDate: (str, locale) => moment(str, format).locale(locale).toDate(),
        placeholder: format,
    }
};

class Dashboard extends Component {
    state = {
        reader: null,
        date: null
    }

    readerSelected = (reader) => {
        this.setState((state, props) => {
            return { ...state, reader: reader };
        });
    }

    handleDateChange = (date) => {
        console.log(date);

        this.setState((state, props) => {
            return { ...state, date: date };
        });
    }

    render() {
        return <Card style={{ maxWidth: 800 }}>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <FormGroup
                    helperText={"leitor usado ao ler as tags..."}
                    label="Leitor "
                    labelInfo="*"
                >
                    <Select
                        items={readers}
                        itemPredicate={readerFilter}
                        itemRenderer={readerRenderer}
                        noResults={<MenuItem disabled={true} text="Sem resultados." />}
                        onItemSelect={this.readerSelected}
                    >
                        <Button style={{ minWidth: "200px" }}
                            alignText={Alignment.LEFT}
                            text={this.state.reader ? this.state.reader.title : '(Nenhuma seleção)'} rightIcon="double-caret-vertical" />
                    </Select>
                </FormGroup>
                <FormGroup
                    helperText={"Data da leitura da tag..."}
                    label="Data da leitura "
                    labelInfo="*"
                >
                    <DateInput
                        style={{ minWidth: "200px" }}
                        locale="pt-br"
                        localeUtils={MomentLocaleUtils}
                        onChange={this.handleDateChange}
                        {...getMomentFormatter("DD/MM/YYYY")}
                        value={this.state.date}
                    />
                </FormGroup>
            </div>
        </Card>
    }
}

export default Dashboard;