/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strsplit.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/22 19:28:50 by blaine            #+#    #+#             */
/*   Updated: 2019/10/29 11:00:18 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

static void	ft_splitting(char **data, const char *str, char c)
{
	int			read;
	const char	*end;
	size_t		length;

	read = 0;
	while (*str)
	{
		if ((*str != c && !read) && (read = 1))
		{
			end = ft_strchr(str, c);
			length = (end != NULL ? end - str : ft_strlen(str));
			*data++ = ft_strsub(str, 0, length);
		}
		else if (read && *str == c)
			read = 0;
		++str;
	}
}

static int	ft_words(char const *s, char c)
{
	int check;
	int word;

	check = 0;
	word = 0;
	while (*s)
	{
		if ((*s != c && check == 0) && (check = 1) && word++)
			;
		check = !(*s++ == c);
	}
	return (word);
}

char		**ft_strsplit(char const *str, char c)
{
	int			i2;
	char		**string;

	if (!str || !c)
		return (NULL);
	i2 = ft_words(str, c);
	if (!(string = (char**)malloc(sizeof(char*) * (i2 + 1))))
		return (NULL);
	string[i2] = NULL;
	ft_splitting(string, str, c);
	return (string);
}
