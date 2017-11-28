
// I've never needed doc. Maybe elm can run outside the browser or something.
// Or I have needed it, I don't know. I've been copying other peoples code for this part.
const fakeNode = { querySelector: () => null, };
const doc = (typeof document !== 'undefined') ? document : fakeNode;

// A fail msg should be {
// ctor: 'MyErrorType (defined in including elm files)',
// _0 : MyErrorType Arg0,
// _1 : MyErrorType Arg1,
// ...
// _N : MyErrorType ArgN
// }
const fail = msg =>_elm_lang$core$Native_Scheduler.fail(msg)
// Pass return value to succeed( returnValue ).
const succeed = _elm_lang$core$Native_Scheduler.succeed
// If your function has no return value, return noReturnValue
const noReturnValue = _elm_lang$core$Native_Utils.Tuple0 

// I think rAF is needed for renders after the first:
const rAF = typeof requestAnimationFrame !== 'undefined'
	? requestAnimationFrame : cb => cb()

const onNode = (selector, apply) =>
	_elm_lang$core$Native_Scheduler.nativeBinding( cb => {
		rAF( ()=>{
			const node = document.querySelector( selector )
			if( node === null ){
				cb( fail({
					ctor: 'NotFound',
					_0: selector,
				}))
			} else
			{
				const returnValue = apply( node )
				cb( succeed( returnValue ) )
			}
		})
	})

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

const toMultilineString = ({ v, maxSize = 20, indent = 0}) =>{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toMultilineString({ v: v[k], maxSize, indent: indent+2}));
			}

			const size = output.reduce(
				(acc, curr) => acc + curr.length + 2, // +2 for comma space
				2 // 4 for '( ' and ' )' but minus the first comma space
			)

			if( size < maxSize)
				return '( ' + output.join(', ') + ' )';

			const inStr = ' '.repeat( indent )
			return '( ' + 
				output.join('\n' + inStr + ', ' ) +
				'\n' + inStr + ')'
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toMultilineString({v :list, maxSize, indent});
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = []
			while (v.ctor === '::')
			{
				output.push( toMultilineString({ v: v._0, maxSize, indent: indent+2}) )
				v = v._1;
			}

			const size = output.reduce(
				(acc, curr) => acc + curr.length + 2, // +2 for comma space
				2 // 4 for '[ ' and ' ]' but minus the first comma space
			)

			if( size < maxSize)
				return '[ ' + output.join(', ') + ' ]'

			const inStr = ' '.repeat( indent )
			return '[ ' + 
				output.join('\n' + inStr + ', ' ) +
				'\n' + inStr + ']'

		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toMultilineString({ v: _elm_lang$core$Set$toList(v), maxSize, indent});
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toMultilineString({ v: _elm_lang$core$Dict$toList(v), maxSize, indent});
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toMultilineString({ v: v[i], maxSize, indent});
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toMultilineString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toMultilineString({ v: v[k], maxSize, indent: indent+5+(k.length)}));
		}
		if (output.length === 0)
		{
			return '{}';
		}

		const size = output.reduce(
			(acc, curr) => acc + curr.length + 2, // +2 for comma space
			2 // 4 for '{ ' and ' }' but minus the first comma space
		)

		if( size < maxSize)
			return '{ ' + output.join(', ') + ' }';

		const inStr = ' '.repeat( indent )
		return '{ ' + 
			output.join('\n' + inStr + ', ' ) +
			'\n' + inStr + '}'
	}

	return '<internal structure>';
}
const _AaronCZim$to_elm_format_string$Native_ToMultilineString = {
	toMultilineString: toMultilineString
}
