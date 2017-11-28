module ToMultilineString exposing (toMultilineString)

{-| A quick way to display the current model in a readable way.
By adding the line 'Html.pre [][ model |> toMultilineString 10 |> Html.text ]'
to your code, you can see exactly what's going on in your program at any time.

@docs toMultilineString

-}

import Native.ToMultilineString


{-| Same as toElmFormatString but uses native to to itterate over objects.
-}
toMultilineString : Int -> a -> String
toMultilineString maxSize a =
    Native.ToMultilineString.toMultilineString { v = a, maxSize = maxSize }
