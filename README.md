# To Multiline String
A quick way to see the model as your programs run. There is only one function, toMultilineString which turns data into a formatted string with newlines and indentation so you can easily read your model's value.

Just add the line:
```Elm
Html.pre [][ model |> toMultilineString 10 |> Html.text ]
```

to the end of your view function and you'll never wonder what the value of your model is again. The input paramater (Int) is the max string length of a value before breaking the value down into multiple lines.
