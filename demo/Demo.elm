module Demo exposing (main)

import Html exposing (..)
import ToElmFormatString exposing (toMultilineString)
import Task


main =
    Html.program
        { init = ( {}, Cmd.none )
        , update = update
        , subscriptions = always Sub.none
        , view = view
        }


type Msg
    = NoOp


type alias Model =
    {}


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( {}, Cmd.none )


view model =
    div []
        [ h3 [] [ text "Single Values are Identical to toSting" ]
        , pre [] [ text (toMultilineString 20 ()) ]
        , pre [] [ text (toMultilineString 20 0) ]
        , pre [] [ text (toMultilineString 20 "0") ]
        , pre [] [ text (toMultilineString 20 ( 1, 2 )) ]
        , pre [] [ text (toMultilineString 20 {}) ]
        , pre [] [ text (toMultilineString 20 { a = 0, b = 2 }) ]
        , pre [] [ text (toMultilineString 17 { a = {}, b = { a = 0, b = 2 } }) ]
        , pre [] [ text (toMultilineString 20 update) ]
        , ul []
            [ li [] [ 10 |> toMultilineString 10 |> text ]
            , li [] [ "string" |> toMultilineString 10 |> text ]
            ]
        , h3 []
            [ text "Lists and Records get newlines and tabulation added like the would with elm-format." ]
        , pre [] [ [ "one", "two", "three" ] |> toMultilineString 10 |> text ]
        , h3 [] [ text "Lists and Rectords can have any depth." ]
        , pre []
            [ [ [ ( 1, 1 )
                , ( 1, 2 )
                , ( 1, 3 )
                ]
              , [ ( 2, 1 ), ( 2, 2 ), ( 2, 3 ) ]
              , [ ( 3, 1 ), ( 3, 2 ), ( 3, 3 ) ]
              ]
                |> toMultilineString 10
                |> text
            ]
        , hr [] []
        , pre []
            [ { one = 1
              , two =
                    [ [ ( 1, 12345678 ), ( 1, 2 ), ( 1, 3 ) ]
                    , [ ( 2, 1 ), ( 2, 2 ), ( 2, 3 ) ]
                    , [ ( 3, 1 ), ( 3, 2 ), ( 3, 3 ) ]
                    ]
              , three = { one = 1, two = 2, three = 3 }
              }
                |> toMultilineString 10
                |> text
            ]
        ]
