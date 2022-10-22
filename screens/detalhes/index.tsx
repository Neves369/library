import React, { useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    useWindowDimensions,
    ActivityIndicator
} from 'react-native';
import { BookMenuBottom, BookMenuTop, LineDivider } from "./style";
import {Slider} from '@miblanchard/react-native-slider';
import bookmarkIcon from "../../assets/icons/mark_icon.png"
import { Reader, ReaderProvider, useReader } from 'epubjs-react-native';

import { 
    AntDesign,
    Feather,
    Entypo,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";



const Detalhes = ({ route, navigation }: any) => {

    const [book, setBook] = useState(null);
    const [show, setShow] = useState(false);
    const [showBook, setShowBook] = useState(false);
    const { width, height } = useWindowDimensions();
    const [currentPage, setCurrentPage] = useState(null);
    const { goNext, progress } = useReader();
    const [teste, setTeste] = useState();
    const [teste2, setTeste2] = useState();
    const [scrollViewWholeHeight, setScrollViewWholeHeight] = useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = useState(0);

    const indicator = new Animated.Value(0);

    React.useEffect(() => {
        let { book } = route.params;
        setBook(book)
    }, [book])

    function renderBookInfoSection() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={{uri: `data:image/gif;base64,${book.capa}`}}
                    resizeMode="cover"
                    style={{
                        position: 'absolute',
                        top: 0  ,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }}
                />

                {/* Color Overlay */}
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}
                >
                </View>

                {/* Navigation header */}
                <View style={{ flexDirection: 'row', paddingHorizontal: 12, height: 80, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{ marginLeft: 8 }}
                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 22, lineHeight: 22 , color: 'white' }}>Detalhes</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {}}
                    >
                        <Feather name="more-horizontal" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Book Cover */}
                <View style={{ flex: 5, paddingTop: 36, alignItems: 'center' }}>
                    <Image
                        source={{uri: `data:image/gif;base64,${book.capa}`}}
                        resizeMode="contain"
                        style={{
                            flex: 1,
                            width: 150,
                            height: "auto"
                        }}
                    />
                </View>

                {/* Book Name and Author */}
                <View style={{ flex: 1.8, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{  fontSize: 22, lineHeight: 30, color: "white" }}>{book.nome}</Text>
                    <Text style={{ fontSize: 16, lineHeight: 22, color: "white" }}>{book.autor}</Text>
                </View>

                {/* Book Info */}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 20,
                        margin: 24,
                        borderRadius: 8,
                        backgroundColor: "rgba(0,0,0,0.3)"
                    }}
                >
                    {/* Rating */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, lineHeight: 22, color: 'white' }}>{book.nota}</Text>
                        <Text style={{ fontSize: 14, lineHeight: 22, color: 'white' }}>Pontuação</Text>
                    </View>

                    <LineDivider />

                    {/* Pages */}
                    <View style={{ flex: 1, paddingHorizontal: 12, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, lineHeight: 22, color: 'white' }}>{book.numeroPaginas}</Text>
                        <Text style={{ fontSize: 14, lineHeight: 22, color: 'white' }}>Páginas</Text>
                    </View>

                    <LineDivider />

                    {/* Language */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, lineHeight: 22, color: 'white' }}>{book.linguagem}</Text>
                        <Text style={{ fontSize: 14, lineHeight: 22, color: 'white' }}>Idioma</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderBookDescription() {

        const indicatorSize = scrollViewWholeHeight > scrollViewVisibleHeight ? scrollViewVisibleHeight * scrollViewVisibleHeight / scrollViewWholeHeight : scrollViewVisibleHeight

        const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1

        return (
            <View style={{ flex: 1, flexDirection: 'row', padding: 24 }}>
                {/* Custom Scrollbar */}
                <View style={{ width: 4, height: "100%", backgroundColor: "#282C35" }}>
                    <Animated.View
                        style={{
                            width: 4,
                            height: indicatorSize,
                            backgroundColor: "#7D7E84",
                            transform: [{
                                translateY: Animated.multiply(indicator, scrollViewVisibleHeight / scrollViewWholeHeight).interpolate({
                                    inputRange: [0, difference],
                                    outputRange: [0, difference],
                                    extrapolate: 'clamp'
                                })
                            }]
                        }}
                    />
                </View>

                {/* Description */}
                <ScrollView
                    contentContainerStyle={{ paddingLeft: 24 }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onContentSizeChange={(width, height) => {
                        setScrollViewWholeHeight(height)
                    }}
                    onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => {
                        setScrollViewVisibleHeight(height)
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: indicator } } }],
                        { useNativeDriver: false }
                    )}
                >
                    <Text style={{ fontSize: 22, lineHeight: 30, color: "white", marginBottom: 12 }}>Description</Text>
                    <Text style={{ fontSize: 20, lineHeight: 30, color: "#7D7E84" }}>{book.descricao}</Text>
                </ScrollView>
            </View>
        )
    }

    function renderBottomButton() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* Bookmark */}
                <TouchableOpacity
                    style={{
                        width: 60,
                        backgroundColor: "#25282F",
                        marginLeft: 24,
                        marginVertical: 8,
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => console.log("Bookmark")}
                >
                    <Image
                        source={bookmarkIcon}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: "#7D7E84"
                        }}
                    />
                </TouchableOpacity>

                {/* Start Reading */}
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: "#F96D41",
                        marginHorizontal: 8,
                        marginVertical: 8,
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() =>{setShowBook(true)}}
                >
                    <Text style={{ fontSize: 16, lineHeight: 22, color: "white" }}>Começar a ler</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function ShowMenu(show: boolean) {
        setShow(show)
       
    }

    function renderBook(){

        function renderLoading(){
            return(
                <ActivityIndicator
                    size={100}
                    color={'black'}
                    style={{
                        marginTop:400
                    }}
                />
            )
        }

        return(
            <SafeAreaView>
                <ReaderProvider>
                    <Reader
                      src={{ base64: book.data}}
                      width={width}
                      height={height}
                    //   onLocationsReady={(locations) => {setTeste({totalNumberOfLocations: locations})}}
                    //   onLocationChange={(visibleLocation) => {setTeste2({visibleLocation})}}
                      onReady={(totalLocations, currentLocation, progress, pageList)=> {console.log("onReady", totalLocations, currentLocation)}}
                      onPress={()=>{ShowMenu(!show)}}
                      onSwipeRight={(currentLocation, progress, pageList)=> {console.log("Direita", progress)}}
                      onSwipeLeft={(currentLocation, progress, pageList)=> {console.log("Esquerda", progress)}}
                      renderLoadingComponent={renderLoading}
                    />
                    {
                        show?
                            <>
                                <BookMenuTop>
                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 15}}>
                                        <AntDesign name="arrowleft" size={24} color="white" />
                                    </View>
                                    <View style={{flex: 3, justifyContent: 'center'}}>
                                    </View>
                                    <View style={{flex: 2, alignItems: 'flex-end', paddingBottom: 15, justifyContent: 'center', flexDirection: 'row'}}> 
                                        <Feather name="search" size={24} color="white" style={{flex: 1}}/>
                                        <MaterialCommunityIcons name="format-letter-case" size={24} color="white" style={{flex: 1}}/>
                                        <Feather name="more-vertical" size={24} color="white" style={{flex: 1}}/>

                                    </View>
                                </BookMenuTop>
                                <BookMenuBottom>
                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <Entypo name="menu" size={24} color="white"  onPress={() => {goNext()}}/> 
                                    </View>
                                    <View style={{flex: 3, justifyContent: 'center'}}>
                                        <Slider

                                            value={0.01}
                                            onValueChange={() =>{}}
                                        />
                                    </View>
                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> 
                                        <Text style={{color: 'white'}}>
                                            1/240
                                        </Text>
                                    </View>
                                </BookMenuBottom>
                            </>
                        :
                            <></>
                    }
                </ReaderProvider>
            </SafeAreaView>
        )
    }

    if (book) {
        if(showBook){
            return(
                renderBook()
            )
        }
        else{
            return (
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    {/* Book Cover Section */}
                    <View style={{ flex: 4 }}>
                        {renderBookInfoSection()}
                    </View>
    
                    {/* Description */}
                    <View style={{ flex: 2 }}>
                        {renderBookDescription()}
                    </View>
    
                    {/* Buttons */}
                    <View style={{ height: 70, marginBottom: 30 }}>
                        {renderBottomButton()}
                    </View>
    
                </View>
            )
        }
    } else {
      return (<></>)
    }

}

export default Detalhes;