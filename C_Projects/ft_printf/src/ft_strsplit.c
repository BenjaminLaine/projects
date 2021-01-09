/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strsplit.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/22 19:28:50 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:46:45 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

char		**ft_strsplit(char const *str, char c)
{
	int			i2[2];
	char		**string;
	char		*tmp;

	tmp = (char*)str;
	ft_memset(i2, 0, 8);
	while ((str && *str))
	{
		((*str != c && !i2[1]) && (i2[1] = 1)) ? i2[0]++ : 1;
		i2[1] = !(*str++ == c);
	}
	if (!str || (!(string = (char**)malloc(sizeof(char*) * (i2[0] + 1)))))
		return (NULL);
	string[i2[0]] = NULL;
	while ((*tmp && i2[0]))
	{
		while (*tmp == c)
			tmp++;
		i2[1] = ft_strcclen(tmp, c);
		*string++ = ft_strndup(tmp, i2[1]);
		tmp = tmp + i2[1];
		while (*tmp == c)
			tmp++;
	}
	return (&*(string - i2[0]));
}
