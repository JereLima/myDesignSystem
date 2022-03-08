import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, Button } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import mock from "../listsOfTest/listDropDown.json";

type ListOfServicesType = {
  item: {
    id: string;
    name: string;
    services: ServicesType[];
  };
};

type ServicesType = {
  id: string;
  name: string;
};

const DropDownList = () => {
  const [open, setOpen] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState<ServicesType[]>([]);
  const [filteredList, setFilteredList] = useState<ServicesType[]>([]);
  const [addServices, setAddServices] = useState<ServicesType[]>([]);

  const handleSetOpen = (id: any) => {
    if (open.includes(id)) {
      const filtered = open.filter((i) => i !== id);
      setOpen([...filtered]);
      return;
    }
    setOpen((old: any) => [...old, id]);
  };

  const handleSelectedService = (item: ServicesType) => {
    if (addServices.includes(item)) {
      const selected = addServices.filter((i) => i !== item);
      setAddServices([...selected]);
      return;
    }
    setAddServices((old) => [...old, item]);
    return;
  };

  const handleSetAllCategory = (listItem: ServicesType[]) => {
    const array = [...addServices];

    listItem.map((item, index) => {

      if (addServices.includes(item)) {
        const selected = array.indexOf(item); //addServices.filter((i => i !== item))
        array.splice(selected, 1);
        setAddServices([...array]);
        return;
      } else {
        setAddServices((old) => [...old, item]);
        return;
      }
    });
  };

  const verifyCheckboxAllCategory = (lista: ServicesType[]) => {
    let quantidade = 0;
    lista.map((item) => {
      if (addServices.includes(item)) {
        quantidade += 1;
      }
    });

    if (lista.length !== quantidade) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (searchText === "") {
      setList(mock);
    } else {
      setFilteredList(filterItems());
    }
  }, [searchText]);

  const filterItems = (): ServicesType[] => {
    return mock
      .reduce((prev: ServicesType[], item) => prev.concat(item.services), [])
      .filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
  };

  const RenderItem = ({ item }: ListOfServicesType) => {
    const iconDirection = open.includes(item.id)
      ? "chevron-up"
      : "chevron-down";
    return (
      <ContainerItem onPress={() => handleSetOpen(item.id)}>
        <HeaderItem>
          <TextItem>{item.name}</TextItem>
          <Icon name={iconDirection} color="#ffff" size={20} />
        </HeaderItem>

        {open.includes(item.id) && (
          <SelectAll onPress={() => handleSetAllCategory(item.services)}>
            <SelectAllText>Selecionar todos dessa categoria</SelectAllText>
            <CheckBoxOut>
              {verifyCheckboxAllCategory(item.services) && (
                <Icon name="check" color="green" size={20} />
              )}
            </CheckBoxOut>
          </SelectAll>
        )}

        {open.includes(item.id) &&
          item.services.map((item, key) => (
            <ContainerItemService
              key={key}
              onPress={() => handleSelectedService(item)}
            >
              <TextItemService>{item.name}</TextItemService>
              <CheckBoxOut>
                {addServices.includes(item) && (
                  <Icon name="check" color="green" size={20} />
                )}
              </CheckBoxOut>
            </ContainerItemService>
          ))}
      </ContainerItem>
    );
  };

  const RenderItemService = ({ item }: ServicesType) => {
    return (
      <ContainerItemService onPress={() => handleSetOpen(item.id)}>
        <TextItemService>{item.name}</TextItemService>
        <CheckBoxOut>
          {addServices.includes(item) && (
            <Icon name="check" color="green" size={20} />
          )}
        </CheckBoxOut>
      </ContainerItemService>
    );
  };

  return (
    <Container>
      <ContainerSearch>
        <SearchInput
          placeholder="Buscar serviço"
          onChangeText={setSearchText}
        />
      </ContainerSearch>

      {!searchText.length ? (
        <FlatList
          data={list}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => <RenderItem item={item} />}
        />
      ) : (
        <FlatList
          data={filteredList}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => <RenderItemService item={item} />}
        />
      )}

      <Button
        title="ver selecionados"
        onPress={() => console.log("ver:", addServices)}
      />
      <Button title="Limpa serviços" onPress={() => setAddServices([])} />
    </Container>
  );
};

export default DropDownList;

export const Container = styled.View`
  flex: 1;
`;

export const ContainerItem = styled.TouchableOpacity`
  align-self: center;
  width: 100%;
  margin: 2px 0;
`;

export const HeaderItem = styled.View`
  width: 100%;
  height: 50px;
  background-color: #bbb;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-right: 15px;
`;
export const ContainerSearch = styled.View`
  height: 80px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 80px;
  background-color: white;
  padding-left: 20px;
`;
export const TextItem = styled.Text`
  color: white;
  font-size: 20px;
  margin-left: 10px;
`;

export const ContainerItemService = styled.TouchableOpacity`
  justify-content: space-between;
  padding: 15px 10px;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

export const TextItemService = styled.Text`
  font-size: 20px;
  flex: 1;
`;

export const CheckBoxOut = styled.View`
  height: 24px;
  width: 24px;
  border: 3px;
  border-style: solid;
  border-color: black;
  justify-content: center;
  align-items: center;
`;

export const SelectAll = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  height: 50px;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  background-color: white;
`;
export const SelectAllText = styled.Text`
  padding-right: 15px;
`;
